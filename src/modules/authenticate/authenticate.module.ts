import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { HttpModule } from "@nestjs/axios";

import { AuthenticateService } from "./authenticate.service";
import { AuthenticateResolver } from "./authenticate.resolver";
import { LocalSerializer } from "../../utils/serializer/local.serializer";
import { LocalStrategy } from "./strategies/local.strategy";
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ApiModule } from "../api/api.module";

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
        HttpModule,
        ApiModule,
    ],
    providers: [AuthenticateResolver, AuthenticateService, LocalSerializer, LocalStrategy, JwtStrategy],
})
export class AuthenticateModule {}
