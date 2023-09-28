import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthenticateService } from "./authenticate.service";
import { AuthenticateResolver } from "./authenticate.resolver";
import { LocalSerializer } from "../../utils/serializer/local.serializer";
import { LocalStrategy } from "./strategies/local.strategy";
import { UserModule } from "../user/user.module";
import { AccessTokenStrategy } from "./strategies/jwt.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get("jwt.secret"),
                signOptions: {
                    expiresIn: config.get("jwt.liveTime"),
                },
            }),
        }),
        PassportModule,
        UserModule,
    ],
    providers: [AuthenticateResolver, AuthenticateService, LocalSerializer, LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthenticateModule {}
