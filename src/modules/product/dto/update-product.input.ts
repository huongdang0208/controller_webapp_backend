import { Field, InputType, Int } from "@nestjs/graphql";

import { DataInput } from './data.input';

@InputType()
export class UpdateProductInput {
    @Field(() => Int, { nullable: false })
    category_id: number;
    
    @Field(() => String, { nullable: true })
    category_name: string;

    @Field(() => DataInput, { nullable: true })
    data: DataInput;

    @Field(() => String, { nullable: true })
    detail_description: string;

    @Field(() => String, { nullable: true })
    instruction: string;

    @Field({ nullable: true })
    images: string;

    @Field(() => String, { nullable: true })
    category_status: string;

    @Field(() => Date, { nullable: true })
    created_at: Date;

    @Field(() => Date, { nullable: true })
    updated_at: Date;
}
