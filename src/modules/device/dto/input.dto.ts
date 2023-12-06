import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";


@InputType()
export class CreateItemInput {
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
}

@InputType()
export class UpdateItemInput extends CreateItemInput {}