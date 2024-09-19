import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class DeviceQueryInput {
    @Field(() => Int)
    userID: number;
}