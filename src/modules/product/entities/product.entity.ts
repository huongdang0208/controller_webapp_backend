import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Data } from "./data.entity";

@ObjectType()
export class Product {
    @Field(() => Int)
    category_id: number;

    @Field(() => String, { nullable: false })
    category_name: string;

    @Field(() => Data, { nullable: true })
    data: Data;

    @Field(() => String, { nullable: false })
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
