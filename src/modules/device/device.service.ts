import { Injectable } from "@nestjs/common";
import { GraphQLError } from 'graphql';
import { CreateDeviceInput, UpdateItemInput } from "./dto/input.dto";
import { DeviceQueryInput } from "./dto/query.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DeviceService {
    constructor(private prisma: PrismaService ) {}

    async create(input: CreateDeviceInput) {
        try {
            const data = await this.prisma.device.create({
                data: {
                    device_name: input.device_name,
                    current_state: input.current_state,
                    userID: input.user_id,
                },
            });
            return data;
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async update(input: UpdateItemInput, deviceID: number) {
        try {
            const data = await this.prisma.device.update({
                where: { id: deviceID },
                data: {
                    device_name: input.device_name,
                    current_state: input.current_state,
                    userID: input.user_id,
                },
            });
            return data;
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async all(filter: DeviceQueryInput) {
        try {
            const data = await this.prisma.device.findMany({
                where: {
                    userID: filter.userID,
                },
            });
            return data;
        } catch (err) {
            throw new GraphQLError(err);
        }
    }
}
