import { ForbiddenException, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";

import { RegisterAuthenticateInput } from "./dto/register-authenticate.input";
import { LoginAuthenticateInput } from "./dto/login-authenticate.input";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthenticateService {
    constructor(private readonly prisma: PrismaService){}
    
    async register (registerAuthenticateInput: RegisterAuthenticateInput) {
        const saltRounds = 10;
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(registerAuthenticateInput.password, salt);

            const user = await this.prisma.user.create({
                data: {
                    username: registerAuthenticateInput.username,
                    email: registerAuthenticateInput.email,
                    password: hash,
                    role: "user",
                },
            });

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

    async login (loginAuthenticateInput: LoginAuthenticateInput) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    email: loginAuthenticateInput.email,
                },
            });

            const result = await bcrypt.compare(loginAuthenticateInput.password, user.password);
            
            if (result) {
                return user;
            } else {
                throw new ForbiddenException("Credentials incorrect");
            }
        } catch (error) {
            throw error;
        }
    }
}
