import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { AuthenticateService } from "./authenticate.service";
import { LoginInput, LoginResponseBlock } from "./dto/login.dto";
import { LogoutResponse } from "./dto/logout-authenticate.response";
import { GqlLocalAuthGuard } from "./guards/gql-auth.guard";
import { RegisterAuthenticateInput, RegisterResponseBlock } from "./dto/register.dto";

@Resolver()
export class AuthenticateResolver {
    constructor(private readonly authenticateService: AuthenticateService) {}

    @Mutation(() => RegisterResponseBlock)
    async register(
        @Args("params")
        registerAuthenticateInput: RegisterAuthenticateInput,
    ): Promise<RegisterResponseBlock> {
        const user = await this.authenticateService.register(registerAuthenticateInput);

        return {
            message: "User registered successfully",
            node: {
                user,
            },
        };
    }

    @Mutation(() => LoginResponseBlock)
    @UseGuards(GqlLocalAuthGuard)
    async login(
        @Args("loginAuthenticateInput")
        loginAuthenticateInput: LoginInput,
    ) {
        return {
            message: "logged in successfully",
            node: this.authenticateService.login(loginAuthenticateInput),
        }
    }

    // @Mutation(() => Authenticate)
    // async get_new_tokens(@Context() context) {
    //     return this.authenticateService.getNewTokens(context.req.user.email, context.req.user.refresh_token);
    // }

    @Mutation(() => LogoutResponse)
    async logout(@Context() context) {
        return this.authenticateService.logout(context.user.email);
    }
}
