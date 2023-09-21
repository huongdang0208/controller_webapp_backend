import { RegisterAuthenticateInput } from './register-authenticate.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class LoginAuthenticateInput extends PartialType(RegisterAuthenticateInput) {
  @Field(() => String, { nullable: false })
    @IsEmail()
    email: string;

    @Field(() => String, { nullable: false })
    password: string;
}
