import { Injectable } from "@nestjs/common";
// import { createWriteStream } from "fs";
// import { FileUpload } from "../../utils/types/data.interface";
import { CreateProductInput } from "./dto/create-product.input";
import { FilterProductInput } from "./dto/filter.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { GraphQLError } from "graphql";

@Injectable()
export class ProductService {
    constructor() {}

    async queryAllProduct({ page = 1, perPage = 10, order }: FilterProductInput){
        const skip = (page - 1) * perPage;
        try {
            // let config: Prisma.ProductFindManyArgs = {
            //     skip: skip || 0,
            //     take: perPage || 10,
            //     include: {
            //         images: true,
            //     },
            // };

            // if (order) {
            //     config = {
            //         ...config,
            //         orderBy: {
            //             product_name: order,
            //         },
            //     };
            // }

            // const products = await this.prisma.product.findMany(config);

            // // Paginate info
            // const total = await this.prisma.product.count();
            // const totalPage = Math.ceil(total / perPage);

            // return {
            //     products,
            //     paginateInfo: {
            //         totalCount: total,
            //         currentPage: page,
            //         totalPage,
            //     },
            // };
        } catch (err) {
            throw new Error(err);
        }
    }

    async createProduct(input: CreateProductInput) {
        try {
            // return this.prisma.product.create({
            //     data: {
            //         product_name: input.product_name,
            //         detail_description: input.detail_description,
            //         instruction: input.instruction,
            //         data: {
            //             create: {
            //                 size: input?.data?.size,
            //                 weight: input?.data?.weight,
            //                 power: input?.data?.power,
            //             },
            //         },
            //         images_id: input.images,
            //         product_status: input.product_status,
            //         price: input.price,
            //         product_characteristic: input.product_characteristic,
            //     },
            //     include: {
            //         images: true,
            //     },
            // });
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateProduct(product_id: number, input: UpdateProductInput) {
        try {
            // return this.prisma.product.update({
            //     where: { product_id: product_id },
            //     data: {
            //         product_name: input.product_name,
            //         product_status: input.product_status,
            //         detail_description: input.detail_description,
            //         instruction: input.instruction,
            //         images_id: input.images,
            //         price: input.price,
            //         product_characteristic: input.product_characteristic,
            //         data: {
            //             update: {
            //                 size: input?.data?.size,
            //                 weight: input?.data?.weight,
            //                 power: input?.data?.power,
            //             },
            //         },
            //     },
            //     include: {
            //         images: true,
            //     },
            // });
        } catch (err) {
            throw new Error(err);
        }
    }

    async findProductById (product_id: number) {
        try {
            // const product = this.prisma.product.findUnique({
            //     where: {
            //         product_id,
            //     },
            //     include: {
            //         images: true,
            //     },
            // });

            // if (!product) {
            //     throw new GraphQLError("Product not found");
            // }

            // return product;
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async deleteProduct(product_id: number) {
        try {
            // const actDelete = await this.prisma.product.delete({ where: { product_id } });
            // return !!actDelete;
        } catch (error) {
            throw new GraphQLError(error);
        }
    }
}
