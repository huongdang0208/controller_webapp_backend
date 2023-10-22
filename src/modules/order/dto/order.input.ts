import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class OrderInput {
    @Field(() => Number, { nullable: false })
    productId: number;

    @Field(() => String, { nullable: false })
    receiverLocation: string;

    @Field(() => String, { nullable: false })
    receiverPhone: string;

    @Field(() => Number, { nullable: false })
    quantity: number;

    @Field(() => Number, { nullable: false })
    totalPrice: number;
}