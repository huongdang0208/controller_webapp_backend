import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { JwtModule } from "@nestjs/jwt";

@Module({
    providers: [UserResolver, UserService],
    imports: [JwtModule.register({})],
})
export class UserModule {}
