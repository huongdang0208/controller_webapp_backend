import { Resolver, Query } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { AccessTokenGuard } from '../../guards/access-jwt.authenticate.guard';
import { UserDecorator } from "../../decorators/user/user.decorator";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => User)
    @UseGuards(AccessTokenGuard)
    me(@UserDecorator() user: User) {
        return user;
    }
}
