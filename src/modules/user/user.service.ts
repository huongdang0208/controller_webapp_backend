import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthApiService } from "../api/auth.service";
import { User } from "./entities/user.entity";
import { GraphQLError } from "graphql";

@Injectable()
export class UserService {
    constructor(
        private config: ConfigService,
        private readonly authApiService: AuthApiService,
    ) {}

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
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("Credentials taken");
                }
            } else {
                throw error;
            }
        }
    }
}
