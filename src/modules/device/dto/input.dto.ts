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

    @Field(() => Number, { nullable: true })
    @IsNumber()
    user_id: number;

    @Field(() => Number, { nullable: true })
    @IsNumber()
    id_address: number;
}

@InputType()
export class UpdateItemInput extends CreateDeviceInput {}