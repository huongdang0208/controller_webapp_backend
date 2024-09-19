import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticateService } from "../authenticate.service";
import { GraphQLError } from "graphql";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthenticateService) {
        super({
            usernameField: "username",
        });
    }

    async validate(username: string, password: string) {
        const user = await this.authService.validateUser(username, password);

        if (!user) {
            throw new GraphQLError("Credentials incorrect");
        }

        return user;
    }
}
