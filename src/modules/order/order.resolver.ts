import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Order } from "./entities/order.entity";
import { OrderService } from "./order.service";
import { JwtAuthGuard } from "../../guards/auth/auth.guard";
import { OrderInput } from "./dto/order.input";
import { UserGraphql } from "../../decorators/user/user.decorator";
import { User } from "../user/entities/user.entity";

@Resolver()
export class OrderResolver {
    constructor(private readonly orderService: OrderService) {}

    @Mutation(() => Order)
    @UseGuards(JwtAuthGuard)
    async create_order(@Args("input") input: OrderInput, @UserGraphql() user: User) {
        return this.orderService.createOrder(input, user);
    }
}
