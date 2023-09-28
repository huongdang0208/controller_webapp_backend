import { Resolver, Query } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { UserDecorator } from "../../decorators/user/user.decorator";
import { JwtAuthGuard } from "../../guards/auth/auth.guard";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    me(@UserDecorator() user: User) {
        return user;
    }
}
