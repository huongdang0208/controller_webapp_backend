import { Field, ObjectType } from "@nestjs/graphql";
import { OrderStatusEnum } from "../../../utils/types/order.enum";

@ObjectType()
export class Order {
    @Field(() => Number)
    orderId: number;

    @Field(() => Number, { nullable: false })
    productId: number;

    @Field(() => String, { nullable: false })
    productName: string;

    @Field(() => String, { nullable: false })
    receiverLocation: string;

    @Field(() => String, { nullable: false })
    receiverPhone: string;

    @Field(() => Number, { nullable: false })
    quantity: number;

    @Field(() => Number, { nullable: false })
    totalPrice: number;

    @Field(() => OrderStatusEnum, { nullable: false })
    orderStatus: OrderStatusEnum;

    @Field(() => Number, { nullable: false })
    ownerId: number;

    @Field({ nullable: true })
    created_at: Date;

    @Field({ nullable: true })
    updated_at: Date;
}
