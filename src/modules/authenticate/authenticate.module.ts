import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { HttpModule } from "@nestjs/axios";
import { Auth } from "googleapis";

import { AuthenticateService } from "./authenticate.service";
import { AuthenticateResolver } from "./authenticate.resolver";
import { LocalSerializer } from "../../utils/serializer/local.serializer";
import { LocalStrategy } from "./strategies/local.strategy";
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";

@Module({
    imports: [
        PassportModule,
        UserModule,
        HttpModule,
    ],
    providers: [AuthenticateResolver, AuthenticateService, LocalSerializer, LocalStrategy, JwtStrategy, Auth.OAuth2Client, GoogleStrategy],
})
export class AuthenticateModule {}
