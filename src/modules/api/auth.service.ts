import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { LOGIN_URL, LOGOUT_URL, REFRESH_TOKEN_URL, REGISTER_URL, SESSION_URL, USER_BY_EMAIL_URL } from "../../constants/authenticate.constant";
import { LoginInput, LoginResponseBlock } from "../authenticate/dto/login.dto";
import { LogoutResponseBlock } from "../authenticate/dto/logout.dto";
import { RefreshTokenInput } from "../authenticate/dto/refreshToken.dto";
import { RegisterAuthenticateInput, RegisterResponseBlock } from "../authenticate/dto/register.dto";
import { User, UserResponse } from "../user/entities/user.entity";

@Injectable()
export class AuthApiService {
    constructor(private httpService: HttpService, private readonly config: ConfigService) {}
    private readonly base_url = this.config.get('API_BASE_URL');

    async register(params: RegisterAuthenticateInput): Promise<RegisterResponseBlock> {
        const { data } = await firstValueFrom(
            this.httpService.post(`${this.base_url}${REGISTER_URL}`, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data?.node?.user;
    }

    async login(params: LoginInput): Promise<LoginResponseBlock> {
        const { data } = await firstValueFrom(
            this.httpService.patch(`${this.base_url}${LOGIN_URL}`, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        console.log(data);
        return data;
    }

    async logout(params: any): Promise<LogoutResponseBlock> {
        const { data } = await firstValueFrom(
            this.httpService.post(`${this.base_url}${LOGOUT_URL}`, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        console.log(data);
        return data;
    }

    async refreshToken(params: RefreshTokenInput, accessToken: string): Promise<LoginResponseBlock> {
        const { data } = await firstValueFrom(
            this.httpService.post(`${this.base_url}${REFRESH_TOKEN_URL}`, { refreshToken: params.refreshToken, accessToken: accessToken }).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }

    async findUserByEmail(email: string): Promise<User> {
        const encodedEmail = encodeURIComponent(email);
        const { data } = await firstValueFrom(
            this.httpService.get(`${this.base_url}${USER_BY_EMAIL_URL}?email=${encodedEmail}`).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );

        return data;
    }

    async findUserByUsername(username: string): Promise<UserResponse> {
        const { data } = await firstValueFrom(
            this.httpService.get(`${this.base_url}${USER_BY_EMAIL_URL}/${username}}`).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );

        return data;
    }

    async getSession(token: string, userID: number): Promise<any> {
        const { data } = await firstValueFrom(
            this.httpService
                .get(`${this.base_url}${SESSION_URL}`, {
                    params: {
                        token,
                        userID,
                    },
                })
                .pipe(
                    catchError((err: AxiosError) => {
                        throw err;
                    }),
                ),
        );

        return data;
    }
}
