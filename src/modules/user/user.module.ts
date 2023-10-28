import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ApiModule } from "../api/api.module";

@Module({
    providers: [UserResolver, UserService],
    imports: [JwtModule.register({}), PassportModule, ApiModule],
    exports: [UserService],
})
export class UserModule {}
