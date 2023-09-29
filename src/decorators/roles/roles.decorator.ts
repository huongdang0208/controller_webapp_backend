import { SetMetadata } from "@nestjs/common";
import { Role } from "../../utils/types/role.enum";

export const ROLES_KEY = "roles";
export const Roles = (...args: Role[]) => SetMetadata(ROLES_KEY, args);
