import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private config: ConfigService,
    ) { }

    async findOne(id: number) {
        try {
            const user = this.prisma.user.findFirst({ where: { id } });

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
            const user = this.prisma.user.findUnique({ where: { email } });

            if (!user) {
                throw new NotFoundException("User not found");
            }

            return user;
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
