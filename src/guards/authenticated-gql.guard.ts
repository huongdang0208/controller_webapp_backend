import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req
    console.log('****', req.isAuthenticated())
    return req.isAuthenticated();
  }
}