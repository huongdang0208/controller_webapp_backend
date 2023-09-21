import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

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
}
