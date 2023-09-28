import { Injectable } from "@nestjs/common";
import { Request } from 'express';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

import { UserService } from "../../user/user.service";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor(
        private userService: UserService,
        private config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("JWT_REFRESH_SECRET"),
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        console.log('****', req.headers)
        const refresh_token = req.headers?.authorization.replace("Bearer", "").trim();
        return {
            ...payload,
            refresh_token
        }
    }
}
