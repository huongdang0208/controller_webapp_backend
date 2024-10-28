import { Injectable } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTimerInput, UpdateTimerInput } from "./dto/timer.input";

@Injectable()
export class TimerService {
    constructor(private readonly prisma: PrismaService) {}

    async all(userID: number) {
        try {
            const data = await this.prisma.timer.findMany({
                where: { userID: userID },
            });
            if (data) {
                return data;
            }
            return [];
        } catch (error) {
            throw new GraphQLError(error);
        }
    }

    async createTimer(input: CreateTimerInput) {
        try {
            const data = this.prisma.device.findFirst({
                where: { id: input?.deviceID },
            });
            if (data) {
                console.log("Timer date: ", input.date);
                console.log("Timer time: ", input.time);
                const newData = await this.prisma.timer.create({
                    data: {
                        userID: input.userID,
                        deviceID: input.deviceID,
                        action: input.action,
                        date: input?.date,
                        time: input?.time,
                    },
                });
                if (newData) {
                    return newData;
                }
                throw new GraphQLError("Cannot create timer");
            } else {
                throw new GraphQLError("Device does not exist!");
            }
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async updateTimer(input: UpdateTimerInput) {
        try {
            const device = await this.prisma.device.findFirst({
                where: { id: input?.deviceID },
            });
            if (device) {
                const updateData = await this.prisma.timer.update({
                    where: { id: input.id },
                    data: {
                        action: input?.action,
                        time: input?.time,
                        date: input?.date,
                        deviceID: input?.deviceID,
                    },
                });
                if (updateData) {
                    return updateData;
                }
                throw new GraphQLError("Cannot update timer!");
            } else {
                throw new GraphQLError("Device does not exist!");
            }
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async deleteTimer(timerID: number) {
        try {
            const data = await this.prisma.timer.delete({
                where: {
                    id: timerID,
                },
            });
            return "Timer deleted successfully!";
        } catch (err) {
            throw new GraphQLError(err);
        }
    }
}
