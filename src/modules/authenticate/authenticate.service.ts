// import { session } from 'express-session';
import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { google, Auth } from "googleapis";
import { JwtService } from "@nestjs/jwt";

import { LoginInput } from "./dto/login.dto";
import { RegisterAuthenticateInput } from "./dto/register.dto";
import { RefreshTokenInput } from "./dto/refreshToken.dto";
import { LogoutInput } from "./dto/logout.dto";
import { ConfigService } from "@nestjs/config";
import { jwtDecode } from "jwt-decode";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthenticateService {
    constructor(
        private prisma: PrismaService,
        private oauthClient: Auth.OAuth2Client,
        private configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {
        const clientID = this.configService.get("GOOGLE_CLIENT_ID");
        const clientSecret = this.configService.get("GOOGLE_SECRET");

        this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
    }

    async validateUser(email: string, password: string) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: { email: email },
            });

            if (!user) {
                throw new GraphQLError("User not found");
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new GraphQLError("Invalid password");
            }

            return user
        } catch (error) {
            throw error;
        }
    }

    async register(registerAuthenticateInput: RegisterAuthenticateInput) {
        try {
            const user = await this.prisma.user.findFirst({
                where: { email: registerAuthenticateInput.email },
            })

            if (user) {
                throw new GraphQLError("User already exists");
            }

            const hashedPassword = await bcrypt.hash(registerAuthenticateInput.password, 10);

            if (!hashedPassword) {
                throw new GraphQLError("Error Service");
            }
            const newUser = await this.prisma.user.create({
                data: {
                    username: registerAuthenticateInput.username,
                    email: registerAuthenticateInput.email,
                    password: hashedPassword,
                },
            });
            if (!newUser) {
                throw new GraphQLError("Error");
            }
            return newUser;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async login(loginAuthenticateInput: LoginInput) {
        try {
            const user = await this.prisma.user.findFirst({
                where: { username: loginAuthenticateInput.username },
            });

            if (!user) {
                throw new GraphQLError("User not found");
            }

            const valid = await bcrypt.compare(loginAuthenticateInput.password, user.password);

            if (!valid) {
                throw new GraphQLError("Invalid password");
            }

            return user;
        } catch (error) {
            throw error;
        }
    }

    // async googleLogin(accessToken: string) {
    //     const token: any = jwtDecode(accessToken);
    //     try {

    //         // const user = await this.authApiService.findUserByEmail(token?.email);
    //         // if (!user) {
    //         //     await this.authApiService.register({ username: token?.name, email: token?.email, password: token?.sub });
    //         //     const authenticatedUser = await this.authApiService.login({ username: token?.name, password: token?.sub });
    //         //     if (!authenticatedUser) {
    //         //         throw new GraphQLError("Error");
    //         //     }
    //         //     return authenticatedUser;
    //         // }
    //         // const res = await this.authApiService.login({ username: token?.name, password: token?.sub });
    //         // if (!res) {
    //         // }
    //         // return res;

    //         const user = await this.prisma.user.findFirst({ where: { email: token?.email }});
    //         if (!user) {
    //             await this.prisma.user.create({
    //                 data: {
    //                     username: token?.name,
    //                     email: token?.email,
    //                     password: token?.sub,
    //                 },
    //             });
    //         }
    //         const authenticatedUser = await this.prisma.user.findFirst({ where: { email: token?.email }});
    //         if (!authenticatedUser) {
    //             throw new GraphQLError("Error");
    //         }
    //         return authenticatedUser;
    //     } catch (err) {
    //         throw new GraphQLError(err);
    //     }
    // }

    async googleLogin(accessToken: string) {
        const token: any = jwtDecode(accessToken);
        try {
          const user = await this.prisma.user.findFirst({ where: { email: token?.email } });
          if (!user) {
            await this.prisma.user.create({
              data: {
                username: token?.name,
                email: token?.email,
                password: token?.sub, // You might want to hash this or handle it differently
              },
            });
          }
          const authenticatedUser = await this.prisma.user.findFirst({ where: { email: token?.email } });
          if (!authenticatedUser) {
            throw new GraphQLError('Error');
          }
          return authenticatedUser;
        } catch (err) {
          throw new GraphQLError(err);
        }
      }

    async refreshToken(params: RefreshTokenInput, accessToken: string) {
        try {
            const { sub: userID } = await this.jwtService.verifyAsync(accessToken, {
                secret: this.configService.get("JWT_SECRET"),
                ignoreExpiration: true,
            });
            const session = await this.prisma.session.findFirst({
                where: {
                    userID: userID,
                    accessToken: accessToken,
                },
            });
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async logout(params: LogoutInput, sessionId: number) {
        try {
            await this.prisma.session.delete({
                where: {
                    id: sessionId,
                    refreshToken: params.refreshToken,
                },
            });

            return true;
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async getSessionByAccessToken(token: string, userId: number) {
        return this.prisma.session.findFirst({
            where: {
                accessToken: token,
                userID: userId,
            },
            include: {
                user: true,
            },
        });
    }
}
