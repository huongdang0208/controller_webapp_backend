import { Role } from '../../../utils/types/role.enum';
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

    @Field(() => String, { nullable: true })
    @IsString()
    hub_license_key: string


    @Field({ nullable: true })
    created_date: string;

    @Field({ nullable: true })
    modify_date: string;
}

@ObjectType()
export class UserResponse {
    @Field(() => Number, { nullable: false })
    id: number;

    @Field(() => String, { nullable: false })
    @IsString()
    username: string;

    @Field(() => String, { nullable: false })
    @IsEmail()
    email: string;

    @Field({ nullable: true })
    created_date: string;

    @Field({ nullable: true })
    modify_date: string;
}
