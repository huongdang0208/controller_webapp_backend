import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { HttpCode, Request, UseGuards } from "@nestjs/common";

import { AuthenticateService } from "./authenticate.service";
import { Authenticate } from "./entities/authenticate.entity";
import { RegisterAuthenticateInput } from "./dto/register-authenticate.input";
import { LoginAuthenticateInput } from "./dto/login-authenticate.input";
import { JwtAuthGuard } from "../../guards/jwt-authenticate.guard";
import { GqlAuthGuard } from '../../guards/gql-authenticate.guard';

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
        console.log(context)
        return this.authenticateService.login(context.user, loginAuthenticateInput);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Mutation(() => Authenticate)
    async authenticate(@Request() req) {
        return req;
    }
}
