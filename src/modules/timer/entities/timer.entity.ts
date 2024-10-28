import { Field, ObjectType } from "@nestjs/graphql";
import { IsDate, IsNumber, IsString } from "class-validator";

@ObjectType()
export class TimerResponse {
    @Field(() => Number, { nullable: false })
    @IsNumber()
    id: number;

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
    @IsString()
    time: Date;

    @Field(() => Date, { nullable: false })
    @IsDate()
    created_at: Date;

    @Field(() => String, { nullable: true })
    @IsString()
    status: string;
}

@ObjectType()
export class TimersResponse {
    @Field(() => [TimerResponse], { nullable: true })
    timers: TimerResponse[];
}
