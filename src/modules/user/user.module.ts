import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
    providers: [UserResolver, UserService],
    imports: [JwtModule.register({}), PassportModule],
    exports: [UserService],
})
export class UserModule {}
