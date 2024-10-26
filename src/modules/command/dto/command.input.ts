import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateCommandInput {
    @Field(() => Number, { nullable: false })
    @IsNumber()
    deviceID: number;

    @Field(() => String, { nullable: false })
    @IsString()
    command: string;

    @Field(() => String, { nullable: true })
    @IsString()
    sender: string;

    @Field(() => String, { nullable: true })
    @IsString()
    receiver: string;

    @Field(() => Number, { nullable: false })
    @IsNumber()
    userID: number;

    @Field(() => Date, { nullable: false })
    @IsDate()
    created_at: Date;
}