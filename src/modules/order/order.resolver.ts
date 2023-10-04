import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../../guards/auth/auth.guard';
import { OrderInput } from './dto/order.input';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard)
  async create_order (@Args('input') input: OrderInput) {
    return this.orderService.createOrder(input)
  }
}
