import { Resolver, Query } from "@nestjs/graphql";
import { Request } from "@nestjs/common";

import { UserService } from "./user.service";
import { User } from "./entities/user.entity";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => User)
    me(@Request() req) {
        return req.user
    }
}
