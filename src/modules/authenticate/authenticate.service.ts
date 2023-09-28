import { ForbiddenException, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { RegisterAuthenticateInput } from "./dto/register-authenticate.input";
import { LoginAuthenticateInput } from "./dto/login-authenticate.input";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "../user/entities/user.entity";

@Injectable()
export class AuthenticateService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
    ) {}

    async signTokens(user_id, email) {
        const access_token = await this.jwtService.signAsync(
            {
                sub: user_id,
                email,
            },
            {
                secret: this.config.get("JWT_ACCESS_SECRET"),
                expiresIn: "1d",
            },
        );

        const refresh_token = await this.jwtService.signAsync(
            {
                sub: user_id,
                email,
                access_token,
            },
            {
                secret: this.config.get("JWT_REFRESH_SECRET"),
                expiresIn: "7d",
            },
        );

        return {
            access_token,
            refresh_token,
        };
    }

    async hashData(data: string) {
        const saltRounds = 5;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(data, salt);
        return hash;
    }

    async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.prisma.user.update({ where: { id: userId }, data: { refresh_token: hashedRefreshToken } });
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
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(registerAuthenticateInput.password, salt);

            const user = await this.prisma.user.create({
                data: {
                    username: registerAuthenticateInput.username,
                    email: registerAuthenticateInput.email,
                    password: hash,
                    role: "user",
                },
            });
            const { access_token, refresh_token } = await this.signTokens(user.id, user.email);
            await this.updateRefreshToken(user.id, refresh_token);
            return {
                access_token,
                refresh_token,
                user,
            };
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

    async login(context: User, loginAuthenticateInput: LoginAuthenticateInput) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    email: context.email,
                },
            });

            const result = await bcrypt.compare(loginAuthenticateInput.password, user.password);

            if (result) {
                const { access_token, refresh_token } = await this.signTokens(user.id, user.email);
                return {
                    access_token,
                    refresh_token,
                    user: user,
                };
            } else {
                throw new ForbiddenException("Credentials incorrect");
            }
        } catch (error) {
            throw error;
        }
    }

    async getNewTokens (email: string, refreshToken: string) {
        try {
            const user = await this.prisma.user.findUnique({ where: {email}})
            if (!user || !user.refresh_token) {
                throw new ForbiddenException('Access denied');
            }
            const isRefreshTokenMatch = await bcrypt.compare(refreshToken, user.refresh_token);
            if (!isRefreshTokenMatch) throw new ForbiddenException('Access denied');
            const { access_token, refresh_token } = await this.signTokens(user.id, user.email);
            await this.updateRefreshToken(user.id, refresh_token);
            return {
                access_token,
                refresh_token,
                user
            }
        } catch (err) {
            throw new Error(err)
        }
    }

    async logout(email: string) {
        await this.prisma.user.update({ where: { email, refresh_token: { not: null } }, data: { refresh_token: null } });
        return { isLogout: true }
    }
}
