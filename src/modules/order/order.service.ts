import { Injectable } from "@nestjs/common";
import { OrderInput } from "./dto/order.input";
import { GraphQLError } from "graphql";
import { MailService } from "../mail/mail.service";
import { Order } from "./entities/order.entity";
import { User } from "../user/entities/user.entity";
import { OrderStatusEnum } from "../../utils/types/order.enum";
import { ProductService } from "../product/product.service";

@Injectable()
export class OrderService {
    constructor(
        private mailService: MailService,
        private productService: ProductService,
    ) {}

    async createOrder(input: OrderInput, userData: User) {
        try {
            // Get product
            // const product = await this.productService.findProductById(input.productId);

            // if (!product) {
            //     throw new GraphQLError("Product not found");
            // }

            // const order = await this.prisma.order.create({
            //     data: {
            //         productId: product.product_id,
            //         productName: product.product_name,
            //         receiverLocation: input.receiverLocation,
            //         receiverPhone: input.receiverPhone,
            //         quantity: input.quantity,
            //         totalPrice: input.totalPrice,
            //         ownerId: userData.id,
            //         orderStatus: OrderStatusEnum.PENDING,
            //     },
            // });

            // if (order) {
            //     await this.mailService.sendUserOrder(userData, order as Order);

            //     return order;
            // }
        } catch (err) {
            throw new GraphQLError(err);
        }
    }
}
