import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthenticateService } from "./authenticate.service";
import { LoginInput, LoginResponseBlock } from "./dto/login.dto";
import { LogoutInput, LogoutResponseBlock } from "./dto/logout.dto";
import { GqlLocalAuthGuard } from "./guards/gql-auth.guard";
import { RegisterAuthenticateInput, RegisterResponseBlock } from "./dto/register.dto";
import { RefreshTokenInput } from "./dto/refreshToken.dto";
import { Request } from "express";
import { GraphQLError } from "graphql/error";
import { JwtAuthGuard } from "../../guards/auth/auth.guard";

@Resolver()
export class AuthenticateResolver {
    constructor(private readonly authenticateService: AuthenticateService) {}

    @Mutation(() => RegisterResponseBlock)
    async register(
        @Args("params")
        registerAuthenticateInput: RegisterAuthenticateInput,
    ) {
        const user = await this.authenticateService.register(registerAuthenticateInput);

        return {
            message: "User registered successfully",
            node: {
                user,
            },
        };
    }
    // This mutation is protected by GqlLocalAuthGuard to ensure that only authenticated users can access it with username and password
    @Mutation(() => LoginResponseBlock)
    @UseGuards(GqlLocalAuthGuard)
    async login(
        @Args("loginAuthenticateInput")
        loginAuthenticateInput: LoginInput,
    ) {
        return {
            message: "logged in successfully",
            node: await this.authenticateService.login(loginAuthenticateInput),
        };
    }

    // @Mutation(() => LoginResponseBlock)
    // async google(
    //     @Args("accessToken")
    //     accessToken: string,
    // ) {
    //     return {
    //         message: "logged in successfully",
    //         node: await this.authenticateService.googleLogin(accessToken),
    //     };
    // }
    @Get("google")
    @UseGuards(AuthGuard("google"))
    async googleAuth(@Req() req) {}

    @Get("google/callback")
    @UseGuards(AuthGuard("google"))
    googleAuthRedirect(@Req() req) {
        return req.user;
    }

    @Mutation(() => LoginResponseBlock, { name: "refresh_token" })
    async refreshToken(@Args("params") params: RefreshTokenInput, @Context("req") req: Request) {
        const headers = req.headers;

        if (!headers.authorization) throw new GraphQLError("Unauthorized");

        // Get access token from headers
        const accessToken = headers.authorization.split(" ")[1];

        return {
            message: "update token successfully",
            node: await this.authenticateService.refreshToken(params, accessToken),
        };
    }

    // This mutation is protected by JwtAuthGuard to ensure that only request with valid JWT token can access it
    @Mutation(() => LogoutResponseBlock)
    @UseGuards(JwtAuthGuard)
    async logout(@Args("params") params: LogoutInput, @Context("req") req: any) {
        const user = req.user;

        if (await this.authenticateService.logout(params, user.session.id)) {
            return {
                message: "logout successfully",
            };
        } else {
            throw new GraphQLError("logout failed");
        }
    }
}
