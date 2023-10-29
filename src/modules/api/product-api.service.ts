import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { CreateProductInput } from "../product/dto/create-product.input";
import { FilterProductInput } from "../product/dto/filter.input";
import { ProductsResponse } from "../product/dto/product.response";
import { UpdateProductInput } from "../product/dto/update-product.input";
import { Product } from "../product/entities/product.entity";

@Injectable()
export class ProductApiService {
    constructor(
        private httpService: HttpService,
        private readonly config: ConfigService,
    ) {}
    private readonly base_url = this.config.get("API_BASE_URL");

    async createProductApi(params: CreateProductInput): Promise<Product> {
        const { data } = await firstValueFrom(
            this.httpService.post(`${this.base_url}/product/create`, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }

    async updateProductApi(params: UpdateProductInput,productId: number): Promise<Product> {
        const { data } = await firstValueFrom(
            this.httpService.patch(`${this.base_url}/product/${productId}`, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }

    async deleteProductApi(productId: number): Promise<boolean> {
        const { data } = await firstValueFrom(
            this.httpService.delete(`${this.base_url}/product/${productId}`).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }

    async findProductByIdApi(productId: number): Promise<Product> {
        const { data } = await firstValueFrom(
            this.httpService.get(`${this.base_url}/product/${productId}`).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }

    async queryAllProducts (filter: FilterProductInput): Promise<ProductsResponse> {
        const { data } = await firstValueFrom(
            this.httpService.get(`${this.base_url}/product/all-products`, {params: {filter}}).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        console.log(data)
        return data;
    }
}
