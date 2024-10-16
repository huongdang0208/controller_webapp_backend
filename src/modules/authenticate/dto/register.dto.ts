import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { BaseOneAbstractResult } from "../../base/dto/base-one.abstract-result";
import { User } from "../../user/entities/user.entity";
import { IsEmail, IsString } from "class-validator";

@InputType()
export class RegisterAuthenticateInput {
    @Field(() => String, { nullable: false })
    @IsString()
    username: string;

    @Field(() => String, { nullable: false })
    @IsEmail()
    email: string;

    @Field(() => String, { nullable: false })
    @IsString()
    password: string;

    @Field(() => String, { nullable: false })
    @IsString()
    hub_license_key: string;
}

@ObjectType()
export class RegisterResponse {
    @Field(() => User)
    user: User;
}

@ObjectType("AuthRegisterResponse")
export class RegisterResponseBlock extends BaseOneAbstractResult(RegisterResponse) {}
