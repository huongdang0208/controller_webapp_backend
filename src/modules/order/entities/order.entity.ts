import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Order {
    @Field(() => Int)
    orderId: number;

    @Field(() => Int, { nullable: false })
    categoryId: number;

    @Field(() => String, { nullable: false })
    receiverLocation: string;

    @Field(() => Int, { nullable: false })
    quantity: number;

    @Field(() => Int, { nullable: false })
    totalPrice: number;

    @Field(() => String, { nullable: false })
    orderStatus: string;

    @Field(() => Int, { nullable: false })
    ownerId: number;

    @Field({ nullable: true })
    createdAt: Date;

    @Field({ nullable: true })
    updatedAt: Date;
}
