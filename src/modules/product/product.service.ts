import { Injectable } from "@nestjs/common";
// import { createWriteStream } from "fs";
// import { FileUpload } from "../../utils/types/data.interface";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductInput } from "./dto/create-product.input";
import { FilterProductInput } from "./dto/filter.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { Product } from "./entities/product.entity";
import { GraphQLError } from "graphql";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async queryAllProduct(filter: FilterProductInput): Promise<Product[]> {
        try {
            const products = await this.prisma.product.findMany({
                skip: filter?.page || 0,
                take: filter?.perPage || 1000,
                where: {
                    product_status: {
                        contains: filter?.status || "",
                    },
                },
            });
            if (products) return products as unknown as Product[];
            return [];
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async createProduct(input: CreateProductInput) {
        try {
            return this.prisma.product.create({
                data: {
                    product_name: input.product_name,
                    detail_description: input.detail_description,
                    instruction: input.instruction,
                    data: {
                        create: {
                            size: input?.data?.size,
                            weight: input?.data?.weight,
                            power: input?.data?.power,
                        },
                    },
                    images_id: input.images,
                    product_status: input.product_status,
                },
                include: {
                    images: true,
                },
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateProduct(product_id: number, input: UpdateProductInput) {
        try {
            return this.prisma.product.update({
                where: { product_id: product_id },
                data: {
                    product_name: input.product_name,
                    product_status: input.product_status,
                    detail_description: input.detail_description,
                    instruction: input.instruction,
                    images_id: input.images,
                    data: {
                        update: {
                            size: input?.data?.size,
                            weight: input?.data?.weight,
                            power: input?.data?.power,
                        },
                    },
                },
                include: {
                    images: true,
                },
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteProduct(product_id: number) {
        try {
            const actDelete = await this.prisma.product.delete({ where: { product_id } });
            return !!actDelete;
        } catch (error) {
            throw new GraphQLError(error);
        }
    }
}
