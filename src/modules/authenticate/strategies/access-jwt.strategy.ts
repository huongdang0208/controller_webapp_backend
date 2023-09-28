import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';

import { UserService } from '../../user/user.service';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private userService: UserService,
        private config: ConfigService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_ACCESS_SECRET')
        })
    }

    async validate (payload: any) {
        const { email } = payload;
        const user: User = await this.userService.getByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}