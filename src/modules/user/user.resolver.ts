import { Resolver, Query } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { JwtAuthGuard } from '../../guards/jwt-authenticate.guard';
import { UserDecorator } from "../../decorators/user/user.decorator";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    me(@UserDecorator() user: User) {
        return user;
    }
}
