import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Role } from "src/utils/types/role.enum";
import { AccessTokenGuard } from "./access-jwt.authenticate.guard";

const RoleGuard = (role: Role): Type<CanActivate> => {
    class RoleGuardMixin extends AccessTokenGuard {
        async canActivate(context: ExecutionContext) {
            await super.canActivate(context);
            const ctx = GqlExecutionContext.create(context);
            const request = ctx.getContext().req;
            const user = request.user;

            return user?.role.includes(role);
        }
    }
    return mixin(RoleGuardMixin);
};

export default RoleGuard;
