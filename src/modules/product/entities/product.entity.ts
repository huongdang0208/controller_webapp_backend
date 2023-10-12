import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { FileUpload } from "../../../modules/file/entities/file.entity";
import { Data } from "./data.entity";

@ObjectType()
export class Product {
    @Field(() => Int)
    product_id: number;

    @Field(() => String, { nullable: false })
    product_name: string;

    @Field(() => Data, { nullable: true })
    data: Data;

    @Field(() => String, { nullable: false })
    detail_description: string;

    @Field(() => String, { nullable: true })
    instruction: string;

    @Field(() => FileUpload, { nullable: true })
    images: FileUpload;

    @Field(() => String, { nullable: true })
    product_status: string;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    price: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    product_characteristic: string;

    @Field(() => Date, { nullable: true })
    created_at: Date;

    @Field(() => Date, { nullable: true })
    updated_at: Date;
}
