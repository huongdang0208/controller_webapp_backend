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

    // @Field(() => String, { nullable: true })
    // @IsString()
    // password: string;

    // @Field(() => Number, { nullable: true })
    // order_id: number;

    @Field({ nullable: false })
    role: Role;

    @Field({ nullable: true })
    created_date: Date;

    @Field({ nullable: true })
    modify_date: Date;
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

    @Field(() => String, { nullable: true })
    @IsString()
    password: string;

    // @Field(() => Number, { nullable: true })
    // order_id: number;

    @Field({ nullable: false })
    role: Role;

    @Field({ nullable: true })
    created_date: Date;

    @Field({ nullable: true })
    modify_date: Date;
}
