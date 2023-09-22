import { ForbiddenException, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { RegisterAuthenticateInput } from "./dto/register-authenticate.input";
import { LoginAuthenticateInput } from "./dto/login-authenticate.input";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "../prisma/prisma.service";
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthenticateService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
    ) {}

    async signToken(user_id, email) {
        const payload = {
            sub: user_id,
            email,
        };
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: "24h",
            secret: this.config.get("JWT_SECRET"),
        });

        return token;
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
            const token = this.signToken(user.id, user.email);
            return {
                access_token: token,
                user: user,
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
                const token = this.signToken(user.id, user.email);
                return {
                    access_token: token,
                    user: user,
                };
            } else {
                throw new ForbiddenException("Credentials incorrect");
            }
        } catch (error) {
            throw error;
        }
    }
}
