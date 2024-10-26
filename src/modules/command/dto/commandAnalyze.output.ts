import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Time {
    @Field()
    hours: number;

    @Field()
    minutes: number;

    @Field()
    seconds: number;
}
@ObjectType()
export class CommandAnalyzeOutput {
    @Field(() => [String], { nullable: false })
    days: String[];

    @Field(() => [Time], { nullable: false })
    hoursPerDay: Time[];
}