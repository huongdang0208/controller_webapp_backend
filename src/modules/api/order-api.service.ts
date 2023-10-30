import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Order } from "../order/entities/order.entity";
import { catchError, firstValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { AxiosError } from "axios";
import { OrdersResponse } from "../order/dto/order.response";
import { OrderFilter } from "../order/dto/order.input";

@Injectable()
export class OrderApiService {
    constructor(
        private readonly httpService: HttpService,
        private config: ConfigService,
    ) {}
    private readonly base_url = this.config.get("API_BASE_URL");

    async createOrderApi(params: any): Promise<Order> {
        const { data } = await firstValueFrom(
            this.httpService.post(`${this.base_url}/order`, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }

    async getAllOrders (filter: OrderFilter): Promise<OrdersResponse> {
        const { data } = await firstValueFrom(
            this.httpService.get(`${this.base_url}/order/all-orders`, {params: {filter}}).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }
}
