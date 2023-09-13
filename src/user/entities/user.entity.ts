import { ObjectType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  @IsString()
  username: string;

  @Field(() => String, { nullable: false })
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: false })
  @IsString()
  password: string;

  @Field(() => [String], { nullable: true })
  order_id: [string];

  @Field({ nullable: true })
  role: string;

  @Field({ nullable: true })
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;
}
