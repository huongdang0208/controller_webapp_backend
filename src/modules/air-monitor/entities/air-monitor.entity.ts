import { Field, ObjectType } from "@nestjs/graphql";
import { IsDate, IsString } from "class-validator";
@ObjectType()
export class AirMonitorDataResponse {
    @Field(() => Number, { nullable: false })
    id: number;

    @Field(() => String)
    @IsString()
    serial_num: string;

    @Field(() => String, { nullable: true })
    created_date: string;

    @Field(() => Number, { nullable: true })
    co2: number;

    @Field(() => Number, { nullable: true })
    aqi: number;

    @Field(() => Number, { nullable: true })
    humid: number;

    @Field(() => Number, { nullable: true })
    pm1: number;

    @Field(() => Number, { nullable: true })
    pm25: number;

    @Field(() => Number, { nullable: true })
    pm10: number;

    @Field(() => Number, { nullable: true })
    tvoc: number;

    @Field(() => Number, { nullable: true })
    tem: number;

    @Field(() => Number, { nullable: true })
    hcho: number;
}
