import { Injectable } from "@nestjs/common";
import { GraphQLError } from 'graphql';
import { DeviceApiService } from "../api/device.service";
import { CreateItemInput, UpdateItemInput } from "./dto/input.dto";
import { DeviceQueryInput } from "./dto/query.dto";

@Injectable()
export class DeviceService {
    constructor(private readonly deviceApiService: DeviceApiService ) {}

    async create(input: CreateItemInput) {
        try {
            const data = await this.deviceApiService.createDevice(input);
            if (data) {
                return data;
            }
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async update(input: UpdateItemInput, deviceID: number) {
        try {
            const data = await this.deviceApiService.updateBlogApi(input, deviceID);
            if (data) {
                return data;
            }
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async all(filter: DeviceQueryInput) {
        try {
            const data = await this.deviceApiService.allDevices(filter);
            if (data) {
                return data;
            }
        } catch (err) {
            throw new GraphQLError(err);
        }
    }
}
