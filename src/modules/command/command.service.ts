import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCommandInput } from "./dto/command.input";
import { CommandResponse } from "./entities/command.entity";
import { Time } from "./dto/commandAnalyze.output";

@Injectable()
export class CommandService {
    constructor(private readonly prisma: PrismaService) {}

    async commandsByUser(userID: number) {
        try {
            const list_commands = await this.prisma.command.findMany({
                where: { userID: userID },
                orderBy: { created_at: "desc" },
            });
            if (list_commands.length === 0) {
                return { commands: [] };
            }
            return { commands: list_commands };
        } catch (error) {
            throw error;
        }
    }

    async commandsByDevice(deviceID: number) {
        try {
            const list_commands = await this.prisma.command.findMany({
                where: {
                    deviceID: deviceID,
                },
                orderBy: { created_at: "desc" },
            });
            if (list_commands.length === 0) {
                return { commands: [] };
            }
            return { commands: list_commands };
        } catch (error) {
            throw error;
        }
    }

    calculateActiveHours(commands: CommandResponse[], days: string[]) {
        var activeHours: Time[] = [{ hours: 0, minutes: 0, seconds: 0 }];
        for (var i = 0; i < commands.length - 1; i++) {
            const dateOne = commands[i].created_at.toISOString().split("T")[0];
            const dateTwo = commands[i + 1].created_at.toISOString().split("T")[0];
            if (commands[i].command === "ON" && commands[i + 1].command === "OFF" && dateOne === dateTwo) {
                var diff = Math.abs(Number(commands[i].created_at) - Number(commands[i + 1].created_at));
                console.log("Diff:", diff);
                const hour = Math.floor(diff / (1000 * 60 * 60));
                diff = diff % (1000 * 60 * 60);
                const minute = Math.floor(diff / (1000 * 60));
                diff = diff % (1000 * 60);
                const second = Math.floor(diff / 1000);
                days.forEach((day, index) => {
                    if (day === dateOne) {
                        activeHours[index].hours += hour;
                        activeHours[index].minutes += minute;
                        activeHours[index].seconds += second;
                    }
                });
            }
        }
        console.log("Active hours:", activeHours);
        if (commands[commands.length - 1].command === "ON" && days[days.length - 1] === commands[commands.length - 1].created_at.toISOString().split("T")[0]) {
            const date = new Date(commands[commands.length - 1].created_at);
            const currentDate = new Date();
            const diff = Math.abs(currentDate.getTime() - date.getTime());
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            activeHours[days.length - 1].hours += hours;
            activeHours[days.length - 1].minutes += minutes;
            activeHours[days.length - 1].seconds += seconds;
        }
        console.log("Active hours:", activeHours);
        return activeHours;
    }

    async analyzeCommandsByDevice(deviceID: number) {
        try {
            const list_commands = await this.prisma.command.findMany({
                where: {
                    deviceID: deviceID,
                },
                orderBy: { created_at: "asc" },
            });
            if (list_commands.length === 0) {
                return { commands: [] };
            }
            const days: string[] = [];
            list_commands.forEach((command, index) => {
                const date = new Date(command.created_at);
                const month = date.getMonth() + 1;
                const dayx = date.getDate();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                console.log(`${index} - Date: ${month}/${dayx} Time: ${hours}:${minutes} - ${command.command}`);
                const day = command.created_at.toISOString().split("T")[0];
                if (!days.includes(day)) {
                    days.push(day);
                }
            });
            const activeHours = this.calculateActiveHours(list_commands, days);
            console.log(days);
            return { days: days, hoursPerDay: activeHours };
        } catch (error) {
            throw error;
        }
    }

    async createCommand(input: CreateCommandInput) {
        try {
            const data = await this.prisma.command.create({
                data: {
                    deviceID: input.deviceID,
                    command: input.command,
                    sender: input.sender,
                    receiver: input.receiver,
                    userID: input.userID,
                    created_at: input.created_at,
                },
            });
            if (data) {
                return data;
            }
            throw new Error("Failed to create command");
        } catch (error) {
            throw error;
        }
    }
}
