import { Injectable } from "@nestjs/common";
import { AirMonitorApiService } from "../api/air-monitor.service";
import { AirMonitorInput } from "./dto/input.dto";
import { GraphQLError } from 'graphql';
import { AirMonitorsResponse } from "./entities/air-monitors.entity";

@Injectable()
export class AirMonitorService {
    constructor(private readonly airMonitorApi: AirMonitorApiService) {}

    async create(input: AirMonitorInput) {
        try {
            const data = await this.airMonitorApi.createMonitorApi(input);
            if (data) {
                return data;
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    async allData(filter: { page: number; perPage: number }): Promise<AirMonitorsResponse> {
        try {
            const data = await this.airMonitorApi.queryAllAirMonitorData(filter) as AirMonitorsResponse;
            console.log('***', data)
            if (data) return data;
        } catch (err) {
            throw new GraphQLError(err)
        }
    }
}
