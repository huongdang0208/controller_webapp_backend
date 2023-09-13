import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class SigninUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: false })
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: false })
  password: string;
}
