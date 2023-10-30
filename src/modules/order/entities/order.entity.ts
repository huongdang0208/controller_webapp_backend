import { Field, ObjectType } from "@nestjs/graphql";
import { OrderStatusEnum } from "../../../utils/types/order.enum";

@ObjectType()
export class Order {
    @Field(() => Number)
    id: number;

    @Field(() => Number, { nullable: false })
    id_product: number;

    @Field(() => String, { nullable: false })
    address: string;

    @Field(() => String, { nullable: false })
    phone: string;

    @Field(() => Number, { nullable: false })
    quantity: number;

    @Field(() => Number, { nullable: false })
    total: number;

    @Field(() => OrderStatusEnum, { nullable: false })
    status: OrderStatusEnum;

    @Field(() => Number, { nullable: false })
    id_customer: number;

    @Field({ nullable: true })
    created_date: string;

    @Field({ nullable: true })
    modify_date: string;
}

