import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { DataInput } from "./data.input";

@InputType()
export class CreateProductInput {
    @Field(() => String, { nullable: false })
    @IsString()
    product_name: string;

    @Field(() => DataInput, { nullable: true })
    data: DataInput;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    detail_description: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    instruction: string;

    @Field(() => Number, { nullable: true })
    @IsOptional()
    @IsNumber()
    images: number;

    @Field(() => String, { nullable: false })
    @IsString()
    product_status: string;
}
