import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommandService {
    constructor(private readonly prisma: PrismaService) {}

    async command(userID: number) {
        return this.prisma.command.findFirst({
            where: { userID: userID },
            orderBy: { created_at: "desc" }
        });
    }
}
