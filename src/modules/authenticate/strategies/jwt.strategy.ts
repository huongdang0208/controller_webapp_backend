import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "../../user/entities/user.entity";
import { AuthenticateService } from "../authenticate.service";
import * as express from "express";
import { Session } from "@prisma/client";
import { GraphQLError } from "graphql/error";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(
        private config: ConfigService,
        private authService: AuthenticateService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("jwt.secret"),
            passReqToCallback: true,
        });
    }

    async validate(req: express.Request, payload: any) {
        const accessToken = req.headers.authorization.split(" ")[1];
        const { sub } = payload;

        const session = await this.authService.getSessionByAccessToken(accessToken, sub);

        if (!session) {
            throw new GraphQLError("Session not found");
        }

        return {
            ...session.user,
            session: {
                id: session.id,
                accessToken: session.accessToken,
                refreshToken: session.refreshToken,
            },
        };
    }
}
