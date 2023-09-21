import { ObjectType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@ObjectType()
export class Authenticate {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  // @Field(() => Number)
  // order_id: number;

  @Field()
  role: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
