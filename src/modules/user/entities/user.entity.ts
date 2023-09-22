import { ObjectType, Field } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";

@ObjectType()
export class User {
    @Field(() => Number, { nullable: false })
    id: number;

    @Field(() => String, { nullable: false })
    @IsString()
    username: string;

    @Field(() => String, { nullable: false })
    @IsEmail()
    email: string;

    // @Field(() => String, { nullable: true })
    // @IsString()
    // password: string;

    // @Field(() => Number, { nullable: true })
    // order_id: number;

    @Field({ nullable: true })
    role: string;

    @Field({ nullable: true })
    created_at: Date;

    @Field({ nullable: true })
    updated_at: Date;
}
