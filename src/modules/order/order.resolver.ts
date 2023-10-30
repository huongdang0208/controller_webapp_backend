import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Order } from "./entities/order.entity";
import { OrderService } from "./order.service";
import { JwtAuthGuard } from "../../guards/auth/auth.guard";
import { OrderFilter, OrderInput } from "./dto/order.input";
import { UserGraphql } from "../../decorators/user/user.decorator";
import { User } from "../user/entities/user.entity";
import { OrdersResponse } from "./dto/order.response";

@Resolver()
export class OrderResolver {
    constructor(private readonly orderService: OrderService) {}

    @Mutation(() => Order)
    @UseGuards(JwtAuthGuard)
    async create_order(@Args("input") input: OrderInput, @UserGraphql() user: User) {
        return this.orderService.createOrder(input, user);
    }

    @Query(() => OrdersResponse)
    async all_orders (@Args("filter") filter: OrderFilter) {
        const orders = await  this.orderService.getAllOrders(filter);
        return orders;
    }
}
