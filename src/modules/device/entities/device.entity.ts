import { Field, ObjectType } from "@nestjs/graphql";
import { IsDate, IsNumber, IsString } from "class-validator";
@ObjectType()
export class DeviceResponse {
    @Field(() => String, { nullable: false })
    @IsString()
    device_name: string;

    @Field(() => Number, { nullable: false })
    @IsNumber()
    id: number;

    @Field(() => Number, { nullable: false })
    @IsNumber()
    userID: number;

    @Field(() => Number, { nullable: true })
    @IsNumber()
    current_state: number;

    @Field(() => String, { nullable: true })
    @IsDate()
    created_at: Date;
}

