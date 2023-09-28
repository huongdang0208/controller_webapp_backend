import { Field, InputType } from "@nestjs/graphql";
import { Data } from "@prisma/client";

@InputType()
export class CreateProductInput {
    @Field(() => String, { nullable: false })
    category_name: string;

    // TODO: fix this
    // @Field(() => String, { nullable: true })
    // data: string;

    @Field(() => String, { nullable: false })
    detail_description: string;

    @Field(() => String, { nullable: true })
    instruction: string;

    @Field(() => [String], { nullable: true })
    images: string[];

    @Field(() => String, { nullable: true })
    category_status: string;

    @Field(() => Date, { nullable: true })
    created_at: Date;

    @Field(() => Date, { nullable: true })
    updated_at: Date;
}
