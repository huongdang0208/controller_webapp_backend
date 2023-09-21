import { Module } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateResolver } from './authenticate.resolver';
import { LocalSerializer } from '../../utils/serializer/local.serializer';
import { UserService } from '../user/user.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthenticateResolver, AuthenticateService, LocalSerializer, UserService, LocalStrategy],
})
export class AuthenticateModule {}
