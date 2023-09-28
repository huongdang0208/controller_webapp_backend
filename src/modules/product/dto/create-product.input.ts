import { Field, InputType } from "@nestjs/graphql";
import * as prisma from '@prisma/client'

// import { DataCategory } from "../../../utils/types/data.interface";

@InputType()
export class CreateProductInput {
    @Field(() => String, { nullable: false })
    category_name: string;

    @Field({ nullable: true })
    data: prisma.Data;

    @Field(() => String, { nullable: false })
    detail_description: string;

    @Field(() => String, { nullable: true })
    instruction: string;

    @Field({ nullable: true })
    images: string[];

    @Field(() => String, { nullable: true })
    category_status: string;

    @Field(() => Date, { nullable: true })
    created_at: Date;

    @Field(() => Date, { nullable: true })
    updated_at: Date;
}
