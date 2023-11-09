import { Injectable } from "@nestjs/common";
import { OrderFilter, OrderInput } from "./dto/order.input";
import { GraphQLError } from "graphql";
import { MailService } from "../mail/mail.service";
import { OrderStatusEnum } from "../../utils/types/order.enum";
import { ProductService } from "../product/product.service";
import { OrderApiService } from "../api/order-api.service";
import { AuthApiService } from '../api/auth.service';

@Injectable()
export class OrderService {
    constructor(
        private mailService: MailService,
        private productService: ProductService,
        private orderApiService: OrderApiService,
        private authApiService: AuthApiService
    ) {}

    async createOrder(input: OrderInput) {
        try {
            // const product = await this.productService.findProductById(input.id_product);
            // if (!product) {
            //     throw new GraphQLError("Product not found");
            // }
            const data = {
                ...input,
                status: OrderStatusEnum.PENDING,
            };

            const order = await this.orderApiService.createOrderApi(data);

            if (order) {
                await this.mailService.sendUserOrder({...order, product_name: 'test_product', name: 'Order Form'});

                return {
                    ...order,
                    name_product: ''
                };
            }
        } catch (err) {
            console.log('service order error', err)
            throw new GraphQLError(err);
        }
    }

    async getAllOrders (filter: OrderFilter) {
        try {
            const res = await this.orderApiService.getAllOrders(filter)
            return res;
        } catch (err) {
            throw new GraphQLError(err);
        }
    }
}
