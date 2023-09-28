import { Field, Int, ObjectType } from "@nestjs/graphql";
@ObjectType()
export class Data {
    @Field(() => Int, { nullable: true })
    data_id: number;

    @Field(() => Int)
    size: number;

    @Field(() => Int)
    weight: number;

    @Field(() => Int)
    power: number;
}