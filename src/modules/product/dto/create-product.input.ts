import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { DataInput } from "./data.input";

@InputType()
export class CreateProductInput {
    @Field(() => String, { nullable: false })
    @IsString()
    name: string;

    @Field(() => DataInput, { nullable: true })
    data: DataInput;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    description: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    instruction: string;

    @Field(() => Number, { nullable: true })
    @IsOptional()
    @IsNumber()
    id_image: number;

    @Field(() => String, { nullable: false })
    @IsString()
    status: string;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    price: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    product_characteristic: string;
}
