import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginInput } from "./dto/login.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterAuthenticateInput } from "./dto/register.dto";
import { Role } from "../../utils/types/role.enum";

@Injectable()
export class AuthenticateService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
    ) {}

    private async signTokens(userId: number, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: this.config.get("jwt.secret"),
                    expiresIn: this.config.get<string>("jwt.liveTime"),
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                },
                {
                    secret: this.config.get("jwt.secret"),
                    expiresIn: this.config.get<string>("jwt.refreshTokenLiveTime"),
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async validateUser(email: string, password: string) {
        try {
            const user = await this.prisma.user.findUnique({ where: { email } });
            if (user) {
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    return user;
                } else {
                    throw new ForbiddenException("Credentials incorrect");
                }
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("Credentials taken");
                }
            } else {
                throw error;
            }
        }
    }

    async register(registerAuthenticateInput: RegisterAuthenticateInput) {
        const saltRounds = 10;

        try {
            // Check username and email exist first
            const userExist = await this.prisma.user.findMany({
                where: {
                    OR: [{ username: registerAuthenticateInput.username }, { email: registerAuthenticateInput.email }],
                },
            });

            if (userExist.length > 0) {
                throw new BadRequestException("Username or email already exist");
            }

            // Create user
            const hash = await bcrypt.hash(registerAuthenticateInput.password, saltRounds);

            return this.prisma.user.create({
                data: {
                    username: registerAuthenticateInput.username,
                    email: registerAuthenticateInput.email,
                    password: hash,
                    role: Role.User,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("Credentials taken");
                }
            } else {
                throw error;
            }
        }
    }

    async login(loginAuthenticateInput: LoginInput) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    email: loginAuthenticateInput.email,
                },
            });

            const result = await bcrypt.compare(loginAuthenticateInput.password, user.password);

            if (!result) {
                throw new BadRequestException("Credentials incorrect");
            }

            const { accessToken, refreshToken } = await this.signTokens(user.id, user.email);

            // Save to session
            await this.prisma.session.create({
                data: {
                    userId: user.id,
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
            console.error(error);
            throw error;
        }
    }

    async getNewTokens(email: string, refreshToken: string) {
        // try {
        //     const user = await this.prisma.user.findUnique({ where: { email } });
        //     if (!user || !user.refresh_token) {
        //         throw new ForbiddenException("Access denied");
        //     }
        //     const isRefreshTokenMatch = await bcrypt.compare(refreshToken, user.refresh_token);
        //     if (!isRefreshTokenMatch) throw new ForbiddenException("Access denied");
        //     const { access_token, refresh_token } = await this.signTokens(user.id, user.email);
        //     await this.updateRefreshToken(user.id, refresh_token);
        //     return {
        //         access_token,
        //         refresh_token,
        //         user,
        //     };
        // } catch (err) {
        //     throw new Error(err);
        // }
    }

    async logout(email: string) {
        // await this.prisma.user.update({
        //     where: { email, refresh_token: { not: null } },
        //     data: { refresh_token: null },
        // });
        // return { isLogout: true };
    }
}
