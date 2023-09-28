import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { HttpCode, UseGuards } from "@nestjs/common";

import { AuthenticateService } from "./authenticate.service";
import { Authenticate } from "./entities/authenticate.entity";
import { RegisterAuthenticateInput } from "./dto/register-authenticate.input";
import { LoginAuthenticateInput } from "./dto/login-authenticate.input";
import { GqlAuthGuard } from '../../guards/gql.authenticate.guard';
import { LogoutResponse } from "./dto/logout-authenticate.response";
import { RefreshTokenGuard } from '../../guards/refresh-jwt.authenticate.guard';

@Resolver(() => Authenticate)
export class AuthenticateResolver {
    constructor(private readonly authenticateService: AuthenticateService) {}

    @HttpCode(201)
    @Mutation(() => Authenticate)
    async register(
        @Args("registerAuthenticateInput")
        registerAuthenticateInput: RegisterAuthenticateInput,
    ) {
        return this.authenticateService.register(registerAuthenticateInput);
    }

    @HttpCode(200)
    @Mutation(() => Authenticate)
    @UseGuards(GqlAuthGuard)
    async login(
        @Args("loginAuthenticateInput")
        loginAuthenticateInput: LoginAuthenticateInput,
        @Context() context
    ) {
        return this.authenticateService.login(context.user, loginAuthenticateInput);
    }

    @HttpCode(200)
    @Mutation(() => Authenticate)
    @UseGuards(RefreshTokenGuard)
    async get_new_tokens(@Context() context) {
        return this.authenticateService.getNewTokens(context.req.user.email, context.req.user.refresh_token)
    }

    @HttpCode(200)
    @Mutation(() => LogoutResponse)
    async logout(@Context() context) {
        return this.authenticateService.logout(context.user.email)
    }
}
