import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";


import { User } from "../../user/entities/user.entity";
import { UserService } from "../../user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            usernameField: "email",
        });
    }
    async validate(email: string, password: string): Promise<User> {
        try {
            const user = await this.userService.getByEmail(email);
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) return user;
            else throw new ForbiddenException('Wrong password');
          } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
          }
    }
}
