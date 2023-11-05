import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsNumber, IsOptional } from "class-validator";

@InputType()
export class OrderInput {
    @Field(() => Number, { nullable: false })
    id_product: number;

    @Field(() => String, { nullable: false })
    address: string;

    @Field(() => String, { nullable: false })
    phone: string;

    @Field(() => String, { nullable: false })
    @IsEmail()
    email: string;

    @Field(() => Number, { nullable: false })
    quantity: number;

    @Field(() => Number, { nullable: false })
    total: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    status: string;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    @IsOptional()
    shipping_fee: number;
}

@InputType()
export class OrderFilter {
    @Field(() => Int, { nullable: true })
    @IsNumber()
    page: number;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    perPage: number;

}
