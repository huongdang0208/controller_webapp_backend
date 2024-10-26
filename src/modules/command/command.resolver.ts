import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CommandResponse, CommandResponseList } from "./entities/command.entity";
import { JwtAuthGuard } from "../../guards/auth/auth.guard";
import { CommandService } from "./command.service";
import { CreateCommandInput } from "./dto/command.input";
import { CommandAnalyzeOutput } from "./dto/commandAnalyze.output";

@Resolver()
export class CommandResolver {
    constructor(private readonly commandService: CommandService) {}

    @Query(() => CommandResponseList)
    @UseGuards(JwtAuthGuard)
    async commands_by_user(@Args("userID") userID: number) {
        return this.commandService.commandsByUser(userID);
    }

    @Query(() => CommandResponseList)
    @UseGuards(JwtAuthGuard)
    async commands_by_device(@Args("deviceID") deviceID: number) {
        return this.commandService.commandsByDevice(deviceID);
    }

    @Query(() => CommandAnalyzeOutput)
    async analyze_commands_by_device(@Args("deviceID") deviceID: number) {
        return this.commandService.analyzeCommandsByDevice(deviceID);
    }

    @Mutation(() => CommandResponse)
    @UseGuards(JwtAuthGuard)
    async create_command(@Args("input") input: CreateCommandInput) {
        return this.commandService.createCommand(input);
    }
}
