import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderInput } from "./dto/order.input";
import { GraphQLError } from "graphql";
import { MailService } from "../mail/mail.service";
import { Order } from "./entities/order.entity";
import { User } from "../user/entities/user.entity";

@Injectable()
export class OrderService {
    constructor(
        private prisma: PrismaService,
        private mailService: MailService,
    ) {}

    async createOrder(input: OrderInput) {
        try {
            const order = await this.prisma.order.create({
                data: {
                    ...input,
                },
            });

            const user = await this.prisma.user.findUnique({ where: { id: input.ownerId } });

            if (order) {
                this.mailService.sendUserOrder(user as User, order as Order);
                return order;
            }
        } catch (err) {
            throw new GraphQLError(err);
        }
    }
}
