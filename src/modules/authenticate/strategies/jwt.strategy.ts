import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../../user/user.service";
import { User } from "../../user/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(
        private config: ConfigService,
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("jwt.secret"),
        });
    }

    async validate(payload: any) {
        const { sub } = payload;

        const user: User = await this.userService.findOne(sub);

        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        return user;
    }
}
