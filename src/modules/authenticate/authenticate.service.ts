import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginInput } from "./dto/login.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterAuthenticateInput } from "./dto/register.dto";
import { Role } from "../../utils/types/role.enum";
import { RefreshTokenInput } from "./dto/refreshToken.dto";
import { GraphQLError } from "graphql/error";
import { LogoutInput } from "./dto/logout.dto";

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
                    throw new GraphQLError("Credentials incorrect");
                }
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new GraphQLError("Credentials taken");
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
                throw new GraphQLError("Username or email already exist");
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
                    throw new GraphQLError("Credentials taken");
                }
            } else {
                throw error;
            }
        }
    }

    async login(loginAuthenticateInput: LoginInput) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    username: loginAuthenticateInput.username,
                },
            });

            if (!user) {
                throw new GraphQLError("Thông tin đăng nhập không hợp lệ");
            }

            const result = await bcrypt.compare(loginAuthenticateInput.password, user.password);

            if (!result) {
                throw new GraphQLError("Thông tin đăng nhập không hợp lệ");
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

    async refreshToken(params: RefreshTokenInput, accessToken: string) {
        try {
            // Get userId from accessToken
            const { sub: userId } = await this.jwtService.verifyAsync(accessToken, {
                secret: this.config.get("jwt.secret"),
                ignoreExpiration: true,
            });

            const session = await this.prisma.session.findFirst({
                where: {
                    userId,
                    refreshToken: params.refreshToken,
                },
                include: {
                    user: true,
                },
            });

            if (!session) {
                throw new GraphQLError("Session Invalid");
            }

            const { accessToken: newAccessToken } = await this.signTokens(session.user.id, session.user.email);

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
                user: session.user,
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
        } catch (e) {
            throw new GraphQLError(e);
        }
    }

    async getSessionByAccessToken(token: string, userId: number) {
        return this.prisma.session.findFirst({
            where: {
                accessToken: token,
                userId,
            },
            include: {
                user: true,
            },
        });
    }
}
