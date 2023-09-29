import { InputType, Field, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";
import { User } from "../../user/entities/user.entity";
import { BaseOneAbstractResult } from "../../base/dto/base-one.abstract-result";

@InputType()
export class LoginInput {
    @Field(() => String, { nullable: false })
    @IsEmail()
    email: string;

    @Field(() => String, { nullable: false })
    password: string;
}

@ObjectType()
export class LoginResponse {
    @Field(() => String)
    @IsString()
    accessToken: string;

    @Field(() => String)
    @IsString()
    refreshToken: string;

    @Field(() => User)
    user: User;
}

@ObjectType()
export class LoginResponseBlock extends BaseOneAbstractResult<LoginResponse>(LoginResponse) {}
