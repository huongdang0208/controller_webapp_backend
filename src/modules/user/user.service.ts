import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { CreateUserInput } from "./dto/create-user.input";
import { SigninUserInput } from "./dto/signin-user.input";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) {}

    async signToken(user_id, email) {
        // const payload = {
        //     sub: user_id,
        //     email,
        // };
        // const token = await this.jwtService.signAsync(payload, {
        //     expiresIn: "24h",
        //     secret: this.config.get("JWT_SECRET"),
        // });
        //
        // return {
        //     access_token: token,
        // };
    }

    async signup(createAuthenticationInput: CreateUserInput) {
        // const hash = await argon2.hash(createAuthenticationInput.password);
        //
        // if (hash) {
        //     try {
        //         console.log("hash: ", hash, "email: ", createAuthenticationInput.username);
        //         const user = await this.prisma.user.create({
        //             data: {
        //                 id: uuidv4(),
        //                 username: createAuthenticationInput.username,
        //                 email: createAuthenticationInput.email,
        //                 password: hash,
        //                 role: "user",
        //             },
        //         });
        //         if (user) return this.signToken(user.id, user.email);
        //     } catch (error) {
        //         if (error instanceof PrismaClientKnownRequestError) {
        //             if (error.code === "P2002") {
        //                 throw new ForbiddenException("Credentials taken");
        //             }
        //         } else {
        //             throw error;
        //         }
        //     }
        // }
    }

    async signin(signinUserInput: SigninUserInput) {
        // try {
        //     const user = await this.prisma.user.findUniqueOrThrow({
        //         where: {
        //             email: signinUserInput.email,
        //         },
        //     });
        //     if (user) {
        //         const hash = await argon2.hash(signinUserInput.password);
        //         if (hash) {
        //             try {
        //                 if (await argon2.verify(user.password, signinUserInput.password)) {
        //                     delete user.password;
        //                     return this.signToken(user.id, user.email);
        //                 } else {
        //                     throw new ForbiddenException("Credentials incorrect");
        //                 }
        //             } catch (error) {
        //                 throw error;
        //             }
        //         }
        //     }
        // } catch (error) {
        //     throw new Error(error);
        // }
    }
}
