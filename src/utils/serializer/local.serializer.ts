import { UserService } from "../../modules/user/user.service";
import { User } from "../../modules/user/entities/user.entity";
import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalSerializer extends PassportSerializer {
    constructor(private readonly userService: UserService) {
        super();
    }
    // The serializeUser function determines the data stored inside of the session
    serializeUser(user: User, done: CallableFunction) {
        done(null, user.email);
    }

    async deserializeUser(email: string, done: CallableFunction) {
        const user = await this.userService.getByEmail(email);
        return user ? done(null, user) : done(null, null)
    }
}
