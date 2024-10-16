import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";


@InputType()
export class CreateDeviceInput {
    @Field(() => String, { nullable: false })
    @IsString()
    device_name: string;

    @Field(() => Number, { nullable: false })
    @IsNumber()
    current_state: number;

    @Field(() => Number, { nullable: false })
    @IsNumber()
    userID: number;

    @Field(() => String, { nullable: true })
    @IsNumber()
    protocol: string;
}

@InputType()
export class UpdateItemInput {
    @Field(() => Number, { nullable: false })
    @IsNumber()
    id: number;

    @Field(() => Number, { nullable: false })
    @IsNumber()
    current_state: number;
}

@InputType()
export class CreateDevicesInput {
    @Field(() => [CreateDeviceInput])
    devices: CreateDeviceInput[];
}