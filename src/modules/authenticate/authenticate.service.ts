// import { session } from 'express-session';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { google, Auth } from "googleapis";
import { JwtService } from "@nestjs/jwt";
import { Logger } from "@nestjs/common";

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

    async validateUser(username: string, pwd: string) {
        try {
            console.log("🚀 ~ file: authenticate.service.ts ~ line 57 ~ AuthenticateService ~ validateUser ~ email", username);
            const user = await this.prisma.user.findUniqueOrThrow({
                where: { username: username },
            });
            console.log("🚀 ~ file: authenticate.service.ts ~ line 59 ~ AuthenticateService ~ validateUser ~ user", user);

            if (!user) {
                throw new GraphQLError("User not found");
            }

            const valid = await bcrypt.compare(pwd, user.password);

            if (!valid) {
                throw new GraphQLError("Invalid password");
            }

            return user;
        } catch (error) {
            throw error;
        }
    }

    async register(registerAuthenticateInput: RegisterAuthenticateInput) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    OR: [{ username: registerAuthenticateInput.username }, { email: registerAuthenticateInput.email }],
                },
            });

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
                    hub_license_key: registerAuthenticateInput.hub_license_key,
                },
            });
            if (!newUser) {
                throw new GraphQLError("Error");
            }
            return newUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    private async signTokens(userId: number, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: this.configService.get("JWT_SECRET"),
                    expiresIn: "2h",
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                },
                {
                    secret: this.configService.get("JWT_SECRET"),
                    expiresIn: "7d",
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async login(loginAuthenticateInput: LoginInput) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    username: loginAuthenticateInput.username,
                },
            });

            if (!user) {
                throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            }

            const result = await bcrypt.compare(loginAuthenticateInput.password, user.password);

            if (!result) {
                throw new Error("Thông tin đăng nhập không hợp lệ");
            }

            const { accessToken, refreshToken } = await this.signTokens(user.id, user.email);

            // Save to session
            await this.prisma.session.create({
                data: {
                    userID: user.id,
                    accessToken,
                    refreshToken,
                },
            });

            return {
                accessToken,
                refreshToken,
                user: user,
            };
        } catch (error) {
            throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
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
                throw new GraphQLError("Error");
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
            console.log("🚀 ~ file: authenticate.service.ts ~ line 228 ~ AuthenticateService ~ refreshToken ~ userID", userID);
            const session = await this.prisma.session.findFirst({
                where: {
                    userID: userID,
                    accessToken: accessToken,
                },
            });

            if (!session) {
                throw new HttpException("Session invalid", HttpStatus.BAD_REQUEST);
            }

            const foundUser = await this.prisma.user.findUnique({
                where: {
                    id: session.userID,
                },
            });

            const { accessToken: newAccessToken } = await this.signTokens(session.userID, foundUser.email);

            // Update session
            await this.prisma.session.update({
                where: {
                    id: session.id,
                },
                data: {
                    accessToken: newAccessToken,
                },
            });

            return {
                accessToken: newAccessToken,
                refreshToken: session.refreshToken,
                user: foundUser,
            };
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
        console.log("🚀 ~ file: authenticate.service.ts ~ line 271 ~ AuthenticateService ~ getSessionByAccessToken ~ token", token);
        const session = await this.prisma.session.findFirst({
            where: {
                accessToken: token,
                userID: userId,
            },
            include: {
                user: true,
            },
        });
        console.log("🚀 ~ file: authenticate.service.ts ~ line 276 ~ AuthenticateService ~ getSessionByAccessToken ~ session", session);
        return session;
    }
}
