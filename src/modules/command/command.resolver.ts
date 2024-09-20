import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CommandResponse } from './dto/command.dto';
import { JwtAuthGuard } from '../../guards/auth/auth.guard';
import { CommandService } from './command.service';

@Resolver()
export class CommandResolver {
    constructor(private readonly commandService: CommandService) {}

    @Query(() => CommandResponse)
    @UseGuards(JwtAuthGuard)
    async command(@Args("userID") userID: number) {
        return this.commandService.command(userID);
    }

}
