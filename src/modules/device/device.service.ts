import { Injectable } from "@nestjs/common";
import { GraphQLError } from 'graphql';
import { CreateDeviceInput, UpdateItemInput, CreateDevicesInput } from "./dto/input.dto";
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
                    userID: input.userID,
                },
            });
            return data;
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async createMany(input: CreateDevicesInput) {
        try {
            const checkUser = await this.prisma.user.findUnique({
                where: {
                    id: input.devices[0].userID,
                },
            });
            if (checkUser?.hub_license_key) {
                await this.prisma.device.createMany({
                    data: input.devices?.map((device) => ({
                        device_name: device.device_name,
                        current_state: device.current_state,
                        userID: device.userID,
                    })),
                });
                const listDevices = await this.prisma.device.findMany({
                    where: {
                        userID: input.devices[0].userID,
                    },
                });
                return listDevices;
            }
            throw new GraphQLError("User's license not found");
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
                    userID: input.userID,
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
