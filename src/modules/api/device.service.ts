import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { AxiosError } from "axios";
import { DeviceResponse } from "../device/entities/device.entity";
import { CreateItemInput, UpdateItemInput } from "../device/dto/input.dto";
import { DevicesResponse } from "../device/dto/response.dto";

@Injectable()
export class DeviceApiService {
    constructor(
        private readonly httpService: HttpService,
        private config: ConfigService,
    ) {}
    private readonly base_url = this.config.get("API_BASE_URL");

    async allDevices(filter: { page: number; perPage: number }): Promise<DevicesResponse> {
        const { data } = await firstValueFrom(
            this.httpService.get(`${this.base_url}/item/all-items`, { params: { filter } }).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }  

    async createDevice(params: CreateItemInput): Promise<DeviceResponse> {
        const { data } = await firstValueFrom(
            this.httpService.post(`${this.base_url}/item/create`, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }

    async updateBlogApi(params: UpdateItemInput, deviceID: number): Promise<DeviceResponse> {
        const { data } = await firstValueFrom(
            this.httpService.patch(`${this.base_url}/item/${deviceID}`, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }
}
