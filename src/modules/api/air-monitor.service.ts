import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { AxiosError } from "axios";
import { AirMonitorDataResponse } from "../air-monitor/entities/air-monitor.entity";
import { AirMonitorInput } from "../air-monitor/dto/input.dto";
import { AirMonitorsResponse } from "../air-monitor/entities/air-monitors.entity";

@Injectable()
export class AirMonitorApiService {
    constructor(
        private readonly httpService: HttpService,
        private config: ConfigService,
    ) {}
    private readonly base_url = this.config.get("API_BASE_URL");

    async createMonitorApi(params: AirMonitorInput): Promise<AirMonitorDataResponse> {
        const { data } = await firstValueFrom(
            this.httpService.post(`${this.base_url}/air-monitor/create`, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }

    async queryAllAirMonitorData(filter: { page: number; perPage: number }): Promise<AirMonitorsResponse> {
        const { data } = await firstValueFrom(
            this.httpService.get(`${this.base_url}/air-monitor/all`, { params: { filter } }).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }
}
