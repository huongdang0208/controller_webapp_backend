import { Field, InputType, Int } from "@nestjs/graphql";
@InputType()
export class DataInput {
    @Field(() => Int, { nullable: true })
    data_id: number;

    @Field(() => Int)
    size: number;

    @Field(() => Int)
    weight: number;

    @Field(() => Int)
    power: number;
}