import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { google, Auth } from "googleapis";

import { LoginInput } from "./dto/login.dto";
import { RegisterAuthenticateInput } from "./dto/register.dto";
import { RefreshTokenInput } from "./dto/refreshToken.dto";
import { LogoutInput } from "./dto/logout.dto";
import { AuthApiService } from "../api/auth.service";
import { ConfigService } from "@nestjs/config";
import { jwtDecode } from "jwt-decode";

@Injectable()
export class AuthenticateService {
    constructor(
        private readonly authApiService: AuthApiService,
        private oauthClient: Auth.OAuth2Client,
        private configService: ConfigService,
    ) {
        const clientID = this.configService.get("GOOGLE_CLIENT_ID");
        const clientSecret = this.configService.get("GOOGLE_SECRET");

        this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
    }

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
            console.log(res)
            return res;
        } catch (error) {
            console.log(error)
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

    async googleLogin(accessToken: string) {
        const token: any = jwtDecode(accessToken);
        try {

            const user = await this.authApiService.findUserByEmail(token?.email);
            if (!user) {
                await this.authApiService.register({ username: token?.name, email: token?.email, password: token?.sub });
                const authenticatedUser = await this.authApiService.login({ username: token?.name, password: token?.sub });
                if (!authenticatedUser) {
                    throw new GraphQLError("Error");
                }
                return authenticatedUser;
            }
            const res = await this.authApiService.login({ username: token?.name, password: token?.sub });
            if (!res) {
            }
            return res;
        } catch (err) {
            throw new GraphQLError(err);
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
