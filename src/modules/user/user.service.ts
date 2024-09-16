import { Injectable, NotFoundException } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async findOne(id: number) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id
                }
            });
            if (!user) {
                throw new NotFoundException("User not found");
            }
            return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getByEmail(email: string) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    email
                }
            });
            if (!user) {
                throw new NotFoundException("User not found");
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
}
