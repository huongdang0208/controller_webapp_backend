import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthApiService } from "../api/auth.service";
import { User } from "./entities/user.entity";
import { GraphQLError } from "graphql";

@Injectable()
export class UserService {
    constructor(
        private readonly authApiService: AuthApiService,
    ) { }

    async findOne(id: number) {
        try {
            // const user = this.prisma.user.findFirst({ where: { id } });
            // if (!user) {
            //     throw new NotFoundException("User not found");
            // }
            // return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getByEmail(email: string) {
        try {
            const res = await this.authApiService.findUserByEmail(email);
            if (!res) {
                throw new GraphQLError("Not found");
            }
            return res;
        } catch (error) {
            throw error;
        }
    }
}
