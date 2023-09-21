import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "../authenticate/strategies/local.strategy";

@Module({
    providers: [UserResolver, UserService, LocalStrategy],
    imports: [JwtModule.register({}), PassportModule],
})
export class UserModule {}
