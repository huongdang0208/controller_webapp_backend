import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ROLES_KEY } from "../../decorators/roles/roles.decorator";
import { User } from "../../modules/user/entities/user.entity";
import { Role } from "../../utils/types/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

        if (!requiredRoles) {
            return true;
        }

        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;

        const user: User = request.user;

        if (user) {
            const roles = user.role;
            return requiredRoles.some((role) => roles.includes(role));
        }

        return false;
    }
}
