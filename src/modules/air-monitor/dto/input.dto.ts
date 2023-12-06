
import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
@InputType()
export class AirMonitorInput {
    @Field(() => String)
    @IsString()
    @IsOptional()
    serial_num: string;

    @Field(() => Number)
    @IsNumber()
    @IsOptional()
    co2: number;

    @Field(() => Number)
    @IsNumber()
    @IsOptional()
    aqi: number;

    @Field(() => Number)
    @IsNumber()
    @IsOptional()
    humid: number;

    @Field(() => Number)
    @IsNumber()
    @IsOptional()
    pm1: number;

    @Field(() => Number)
    @IsNumber()
    @IsOptional()
    pm25: number;

    @Field(() => Number)
    @IsNumber()
    @IsOptional()
    pm10: number;

    @Field(() => Number)
    @IsNumber()
    @IsOptional()
    tvoc: number;

    @Field(() => Number)
    @IsNumber()
    @IsOptional()
    tem: number;

    @Field(() => Number)
    @IsNumber()
    @IsOptional()
    hcho: number;
}