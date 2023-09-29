import { ExecutionContext, Injectable } from "@nestjs/common";
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
}
