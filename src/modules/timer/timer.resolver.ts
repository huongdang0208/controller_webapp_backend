import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TimerService } from "./timer.service";
import { TimerResponse, TimersResponse } from "./entities/timer.entity";
import { JwtAuthGuard } from "../../guards/auth/auth.guard";
import { UseGuards } from "@nestjs/common";
import { CreateTimerInput, UpdateTimerInput } from "./dto/timer.input";

@Resolver()
export class TimerResolver {
    constructor(private timerService: TimerService) {}

    @Query(() => TimersResponse)
    @UseGuards(JwtAuthGuard)
    async all_timers(@Args("userId") userId: number) {
        const data = await this.timerService.all(userId);
        return { timers: data };
    }

    @Mutation(() => TimerResponse)
    @UseGuards(JwtAuthGuard)
    async create_timer(@Args("input") input: CreateTimerInput) {
        return this.timerService.createTimer(input);
    }

    @Mutation(() => TimerResponse)
    @UseGuards(JwtAuthGuard)
    async update_timer(@Args("input") input: UpdateTimerInput) {
        return this.timerService.updateTimer(input);
    }

    @Mutation(() => String)
    @UseGuards(JwtAuthGuard)
    async delete_timer(@Args("timerID") timerID: number) {
        return this.timerService.deleteTimer(timerID);
    }
}
