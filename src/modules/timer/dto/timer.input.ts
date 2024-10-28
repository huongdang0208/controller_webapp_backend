import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateTimerInput {
    @Field(() => String, { nullable: false })
    @IsString()
    action: string;

    @Field(() => Number, { nullable: true })
    @IsNumber()
    userID: number;

    @Field(() => Number, { nullable: false })
    @IsNumber()
    deviceID: number;

    @Field(() => Date, { nullable: false })
    @IsDate()
    date: Date;

    @Field(() => Date, { nullable: false })
    @IsDate()
    time: Date;

    @Field(() => String, { nullable: true })
    @IsString()
    status: string;
}

@InputType()
export class UpdateTimerInput {
    @Field(() => Number, { nullable: false })
    @IsNumber()
    id: number;

    @Field(() => String, { nullable: true })
    @IsString()
    action: string;

    @Field(() => Number, { nullable: true })
    @IsNumber()
    deviceID: number;

    @Field(() => Date, { nullable: true })
    @IsDate()
    date: Date;

    @Field(() => Date, { nullable: false })
    @IsDate()
    time: Date;

    @Field(() => String, { nullable: true })
    @IsString()
    status: string;
}
