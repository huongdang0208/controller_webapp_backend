
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Order } from "./entities/order.entity";
import { OrderService } from "./order.service";
import { OrderFilter, OrderInput } from "./dto/order.input";
import { OrdersResponse } from "./dto/order.response";

@Resolver()
export class OrderResolver {
    constructor(private readonly orderService: OrderService) {}

    @Mutation(() => Order)
    async create_order(@Args("input") input: OrderInput) {
        return this.orderService.createOrder(input);
    }

    @Query(() => OrdersResponse)
    async all_orders (@Args("filter") filter: OrderFilter) {
        const orders = await  this.orderService.getAllOrders(filter);
        return orders;
    }
}
