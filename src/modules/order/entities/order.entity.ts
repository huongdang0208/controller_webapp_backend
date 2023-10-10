import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Order {
    @Field(() => Int)
    orderId: number;

    @Field(() => Int, { nullable: false })
    categoryId: number;

    @Field(() => String, { nullable: false })
    categoryName: string;

    @Field(() => String, { nullable: false })
    receiverLocation: string;

    @Field(() => String, { nullable: false })
    receiverPhone: string;

    @Field(() => Int, { nullable: false })
    quantity: number;

    @Field(() => Int, { nullable: false })
    totalPrice: number;

    @Field(() => String, { nullable: false })
    orderStatus: string;

    @Field(() => Int, { nullable: false })
    ownerId: number;

    @Field({ nullable: true })
    created_at: Date;

    @Field({ nullable: true })
    updated_at: Date;
}
