import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "../../user/entities/user.entity";
import { AuthenticateService } from "../authenticate.service";
import { GraphQLError } from "graphql";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthenticateService) {
        super({
            usernameField: "username",
        });
    }

    async validate(email: string, password: string): Promise<User> {
        const user = await this.authService.validateUser(email, password);

        if (!user) {
            throw new GraphQLError("Credentials incorrect");
        }

        return user;
    }
}
