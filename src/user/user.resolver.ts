import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { SigninUserInput } from './dto/signin-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  singup(
    @Args('createAuthenticationInput')
    createAuthenticationInput: CreateUserInput,
  ) {
    return this.userService.signup(createAuthenticationInput);
  }

  @Mutation(() => User)
  singin(
    @Args('updateAuthenticationInput')
    updateAuthenticationInput: SigninUserInput,
  ) {
    return this.userService.signin(updateAuthenticationInput);
  }
}
