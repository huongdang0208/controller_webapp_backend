import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class FilterProductInput {
    @Field(() => String, { nullable: true })
    order: string;

    @Field(() => Int, { nullable: true })
    page: number;

    @Field(() => Int, { nullable: true })
    perPage: number;

    @Field(() => String, { nullable: true })
    status: string;
}