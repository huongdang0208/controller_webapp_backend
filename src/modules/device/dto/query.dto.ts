import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class DeviceQueryInput {
    @Field(() => Int)
    page: number;

    @Field(() => Int)
    perPage: number;
}