import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { HttpCode, UseGuards } from "@nestjs/common";

import { AuthenticateService } from "./authenticate.service";
import { Authenticate } from "./entities/authenticate.entity";
import { RegisterAuthenticateInput } from "./dto/register-authenticate.input";
import { LoginAuthenticateInput } from "./dto/login-authenticate.input";
import { LogInWithCredentialsGuard } from "../../guards/login-gql.guard";
import { AuthenticatedGuard } from "../../guards/authenticated-gql.guard";
import { SessionAccount } from "../../decorators/graphql/session-account.decorator";

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
    @UseGuards(LogInWithCredentialsGuard)
    @Mutation(() => Authenticate)
    async login(
        @Args("loginAuthenticateInput")
        loginAuthenticateInput: LoginAuthenticateInput,
    ) {
        return this.authenticateService.login(loginAuthenticateInput);
    }

    @HttpCode(200)
    @UseGuards(AuthenticatedGuard)
    @Mutation(() => Authenticate)
    async authenticate(@SessionAccount() user) {
        return user;
    }
}
