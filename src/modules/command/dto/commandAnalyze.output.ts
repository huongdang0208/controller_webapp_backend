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
    @Field(() => [Date], { nullable: true })
    days: Date[];

    @Field(() => [Time], { nullable: true })
    hoursPerDay: Time[];
}