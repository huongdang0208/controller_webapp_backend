import { Injectable } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { CreateDeviceInput, UpdateItemInput, CreateDevicesInput, DeleteDeviceInput } from "./dto/input.dto";
import { DeviceQueryInput } from "./dto/query.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DeviceService {
    private readonly esp32s3Pin = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33, 34, 35, 36, 39];
    private readonly esp32DevKitPin = [2, 4, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33];
    private readonly esp32c6Pin = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
    constructor(private prisma: PrismaService) {}

    async create(input: CreateDeviceInput) {
        try {
            var pin: number;
            if (input.protocol === "BLE") {
                const listBLEDevices = await this.prisma.device.findMany({
                    where: {
                        protocol: "BLE",
                    },
                });
                this.esp32DevKitPin.forEach((element) => {
                    if (!listBLEDevices.find((device) => device.pin === element)) {
                        pin = element;
                    }
                });
            } else if (input.protocol === "MQTT") {
                const listMQTTDevices = await this.prisma.device.findMany({
                    where: {
                        protocol: "MQTT",
                    },
                });
                this.esp32s3Pin.forEach((element) => {
                    if (!listMQTTDevices.find((device) => device.pin === element)) {
                        pin = element;
                    }
                });
            } else {
                const listDevices = await this.prisma.device.findMany({
                    where: {
                        protocol: "ZIGBEE",
                    },
                });
                this.esp32c6Pin.forEach((element) => {
                    if (!listDevices.find((device) => device.pin === element)) {
                        pin = element;
                    }
                });
            }

            const data = await this.prisma.device.create({
                data: {
                    device_name: input.device_name,
                    current_state: input.current_state,
                    userID: input.userID,
                    protocol: input.protocol,
                    pin: pin,
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
                        protocol: device.protocol,
                        pin: device.pin,
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

    async update(input: UpdateItemInput) {
        try {
            console.log('update device', input);
            const updated_device = await this.prisma.device.update({
                where: { id: input.id },
                data: {
                    current_state: input.current_state,
                },
            });
            await this.prisma.command.create({
                data: {
                    deviceID: input.id,
                    command: input.current_state == 0 ? "OFF" : "ON",
                    sender: "device",
                    receiver: "server",
                    userID: updated_device.userID,
                },
            });
            return updated_device;
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

    async findDevicesByLicense(license: string) {
        try {
            const data = await this.prisma.device.findMany({
                where: {
                    user: {
                        hub_license_key: license,
                    },
                },
            });
            return data;
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async delete(input: DeleteDeviceInput) {
        try {
            const data = await this.prisma.device.delete({
                where: { id: input.id },
            });
            return "Device deleted successfully";
        } catch (err) {
            throw new GraphQLError(err);
        }
    }
}
