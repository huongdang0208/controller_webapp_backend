import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { LOGIN_URL, REGISTER_URL, SESSION_URL, USER_BY_EMAIL_URL } from "../../constants/authenticate.constant";
import { LoginInput, LoginResponseBlock } from "../authenticate/dto/login.dto";
import { LogoutResponseBlock } from "../authenticate/dto/logout.dto";
import { RegisterAuthenticateInput, RegisterResponseBlock } from "../authenticate/dto/register.dto";
import { User, UserResponse } from "../user/entities/user.entity";

@Injectable()
export class AuthApiService {
    constructor(private httpService: HttpService) {}
    async register(params: RegisterAuthenticateInput): Promise<RegisterResponseBlock> {
        const { data } = await firstValueFrom(
            this.httpService.post(REGISTER_URL, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        console.log(data);
        return data;
    }

    async login(params: LoginInput): Promise<LoginResponseBlock> {
        const { data } = await firstValueFrom(
            this.httpService.patch(LOGIN_URL, params).pipe(
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
            this.httpService.post(LOGIN_URL, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        console.log(data);
        return data;
    }

    async findUserByEmail(email: string): Promise<User> {
        const encodedEmail = encodeURIComponent(email);
        const { data } = await firstValueFrom(
            this.httpService.get(`${USER_BY_EMAIL_URL}?email=${encodedEmail}`).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );

        return data;
    }

    async findUserByUsername(username: string): Promise<UserResponse> {
        const { data } = await firstValueFrom(
            this.httpService.get(`${USER_BY_EMAIL_URL}/${username}}`).pipe(
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
                .get(`${SESSION_URL}`, {
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
