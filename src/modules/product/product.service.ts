import { Injectable } from "@nestjs/common";
// import { createWriteStream } from "fs";
// import { FileUpload } from "../../utils/types/data.interface";
import { CreateProductInput } from "./dto/create-product.input";
import { FilterProductInput } from "./dto/filter.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { GraphQLError } from "graphql";
import { ProductApiService } from "../api/product-api.service";

@Injectable()
export class ProductService {
    constructor(private readonly productApiService: ProductApiService) {}

    async queryAllProducts({ page = 1, perPage = 10, order, status }: FilterProductInput) {
        try {
            return this.productApiService.queryAllProducts({ page, perPage, order, status } as FilterProductInput);
        } catch (err) {
            throw new Error(err);
        }
    }

    async createProduct(input: CreateProductInput) {
        try {
            return this.productApiService.createProductApi(input);
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateProduct(product_id: number, input: UpdateProductInput) {
        try {
            return this.productApiService.updateProductApi(input, product_id);
        } catch (err) {
            throw new Error(err);
        }
    }

    async findProductById(product_id: number) {
        try {
            return this.productApiService.findProductByIdApi(product_id);
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async deleteProduct(product_id: number) {
        try {
            return this.productApiService.deleteProductApi(product_id);
        } catch (error) {
            throw new GraphQLError(error);
        }
    }
}
