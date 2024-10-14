import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "../../guards/auth/auth.guard";
import { DeviceService } from "./device.service";
import { CreateDeviceInput, UpdateItemInput, CreateDevicesInput } from "./dto/input.dto";
import { DeviceQueryInput } from "./dto/query.dto";
import { DevicesResponse } from "./dto/response.dto";
import { DeviceResponse } from "./entities/device.entity";

@Resolver()
export class DeviceResolver {
    constructor(private deviceService: DeviceService) {}

    @Query(() => DevicesResponse)
    @UseGuards(JwtAuthGuard)
    async all_devices(@Args("filter", { nullable: true }) filter?: DeviceQueryInput) {
        const data = await this.deviceService.all(filter);
        return { items: data };
    }

    @Mutation(() => DeviceResponse)
    @UseGuards(JwtAuthGuard)
    async create_device(@Args("input") input: CreateDeviceInput) {
        return this.deviceService.create(input);
    }

    @Mutation(() => DevicesResponse)
    @UseGuards(JwtAuthGuard)
    async create_devices(@Args("input") input: CreateDevicesInput): Promise<DevicesResponse> {
        const data = await this.deviceService.createMany(input);
        return { items: data };
    }

    @Mutation(() => DeviceResponse)
    @UseGuards(JwtAuthGuard)
    async update_device(@Args("id") id: number, @Args("input") input: UpdateItemInput) {
        return this.deviceService.update(input, id);
    }
}
