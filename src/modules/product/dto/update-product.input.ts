import { Field, InputType, Int } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

import { DataInput } from './data.input';

@InputType()
export class UpdateProductInput {
    @Field(() => Int, { nullable: false })
    product_id: number;
    
    @Field(() => String, { nullable: true })
    product_name: string;

    @Field(() => DataInput, { nullable: true })
    data: DataInput;

    @Field(() => String, { nullable: true })
    detail_description: string;

    @Field(() => String, { nullable: true })
    instruction: string;

    @Field(() => Number, { nullable: true })
    @IsOptional()
    images: number;

    @Field(() => String, { nullable: true })
    product_status: string;

    @Field(() => Date, { nullable: true })
    created_at: Date;

    @Field(() => Date, { nullable: true })
    updated_at: Date;
}
