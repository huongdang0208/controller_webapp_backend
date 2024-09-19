import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard("local") {
    constructor() {
        super();
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const gqlReq = ctx.getContext().req;

        if (gqlReq) {
            const { loginAuthenticateInput } = ctx.getArgs();
            gqlReq.body = loginAuthenticateInput;

            return gqlReq;
        }

        return context.switchToHttp().getRequest();
    }
    handleRequest(err, user, info, context) {
        if (err || !user) {
            console.log("🚀 ~ file: gql-auth.guard.ts ~ line 47 ~ GqlLocalAuthGuard ~ handleRequest ~ err", err);
            throw err || new UnauthorizedException();
        }
        return user;
      }
}
