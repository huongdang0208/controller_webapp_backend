import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class QueryInput {
    @Field(() => Int)
    page: number;

    @Field(() => Int)
    perPage: number;
}