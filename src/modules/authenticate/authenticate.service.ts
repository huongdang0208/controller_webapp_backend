import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { LoginInput } from "./dto/login.dto";
import { RegisterAuthenticateInput } from "./dto/register.dto";
import { RefreshTokenInput } from "./dto/refreshToken.dto";
import { LogoutInput } from "./dto/logout.dto";
import { AuthApiService } from "../api/auth.service";
import { GraphQLError } from "graphql";

@Injectable()
export class AuthenticateService {
    constructor(
        private readonly authApiService: AuthApiService,
    ) { }

    async validateUser(username: string, password: string) {
        try {
            const user = await this.authApiService.findUserByUsername(username);

            if (user) {
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    return user;
                } else {
                    throw new Error("Credentials incorrect");
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async register(registerAuthenticateInput: RegisterAuthenticateInput) {
        try {
            const res = await this.authApiService.register(registerAuthenticateInput);
            if (!res) {
            }
            return res;
        } catch (error) {
            throw error;
        }
    }

    async login(loginAuthenticateInput: LoginInput) {
        try {
            const res = await this.authApiService.login(loginAuthenticateInput);
            if (!res) {
            }
            return res;
        } catch (error) {
            throw error;
        }
    }

    async refreshToken(params: RefreshTokenInput, accessToken: string) {
        try {
            const res = await this.authApiService.refreshToken(params, accessToken);
            if (!res) {
            }
            return res;
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async logout(params: LogoutInput, sessionId: number) {
        try {
            const res = await this.authApiService.logout({ params, sessionId: sessionId });
            if (!res) {
            }
            return res;
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async getSessionByAccessToken(token: string, userId: number) {
        return await this.authApiService.getSession(token, userId);
    }
}
