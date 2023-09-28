import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
// import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { PrismaService } from "../prisma/prisma.service";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        // private jwtService: JwtService,
        private config: ConfigService,
    ) {}
    async findOne(email: string) {
        try {
            const user = this.prisma.user.findUnique({ where: { email } });
            if (user) {
                return user;
            } else {
                throw new ForbiddenException("Credentials taken");
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.findOne(email);
        if (user && user.password === pass) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async getByEmail(email: string): Promise<User>{
        try {
            const user = this.prisma.user.findUnique({ where: { email } });
            if (user) return user;
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
