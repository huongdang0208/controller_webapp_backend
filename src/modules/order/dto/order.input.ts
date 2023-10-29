import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional } from "class-validator";

@InputType()
export class OrderInput {
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

    @Field(() => String, { nullable: true })
    @IsOptional()
    status: string;

    @IsNumber()
    @IsOptional()
    shipping_fee: number;
}
