import { ObjectType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Authenticate {
  @Field(() => String)
  @IsString()
  access_token: string;

  @Field(() => String)
  @IsString()
  refresh_token: string;

  @Field(() => User)
  user: User;
}
