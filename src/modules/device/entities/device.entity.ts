import { Field, ObjectType } from "@nestjs/graphql";
import { IsDate, IsNumber, IsString } from "class-validator";
@ObjectType()
export class DeviceResponse {
    @Field(() => String, { nullable: false })
    @IsString()
    serial_num: string;

    @Field(() => Number, { nullable: false })
    @IsNumber()
    id_product: number;

    @Field(() => Number, { nullable: true })
    @IsNumber()
    id_customer: number;

    @Field(() => Number, { nullable: true })
    @IsNumber()
    id_address: number;

    @Field(() => String, { nullable: true })
    connected_date: string;
}

