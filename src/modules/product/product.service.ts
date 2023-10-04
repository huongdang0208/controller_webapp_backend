import { Injectable } from "@nestjs/common";
import { createWriteStream } from "fs";

import { FileUpload } from "../../utils/types/data.interface";
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
            const products = await this.prisma.category.findMany({
                skip: filter?.page || 0,
                take: filter?.perPage || 1000,
                where: {
                    category_status: {
                        contains: filter?.status || "",
                    },
                },
            });
            if (products) return products as Product[];
            return [];
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async createProduct(input: CreateProductInput, image: FileUpload) {
        try {
            if (image) {
                const { createReadStream, filename, mimetype } = await image;
                const path = `./images/category/${filename}`;

                await createReadStream().pipe(createWriteStream(path));

                const product = this.prisma.category.create({
                    data: {
                        category_name: input.category_name,
                        detail_description: input.detail_description,
                        instruction: input.instruction,
                        data: {
                            create: {
                                size: input?.data?.size,
                                weight: input?.data?.weight,
                                power: input?.data?.power,
                            },
                        },
                        images: path,
                        category_status: input.category_status,
                    },
                });

                this.prisma.file.create({
                    data: {
                        filename: filename,
                        mimetype: mimetype,
                        path: path,
                        size: 12,
                        blogId: null,
                        categoryId: (await product).category_id,
                    },
                });

                return product;
            } else {
                const product = this.prisma.category.create({
                    data: {
                        category_name: input.category_name,
                        detail_description: input.detail_description,
                        instruction: input.instruction,
                        data: {
                            create: {
                                size: input?.data?.size,
                                weight: input?.data?.weight,
                                power: input?.data?.power,
                            },
                        },
                        images: "",
                        category_status: input.category_status,
                    },
                });
                return product;
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateProduct(input: UpdateProductInput, image: FileUpload) {
        try {
            if (!input.category_id) {
                throw new Error("Field category_id is required, but not provided");
            }
            if (image) {
                const { createReadStream, filename, mimetype } = await image;
                const path = `./images/category/${filename}`;

                await createReadStream().pipe(createWriteStream(path));

                const product = await this.prisma.category.update({
                    where: { category_id: input.category_id },
                    data: {
                        category_name: input.category_name,
                        category_status: input.category_status,
                        detail_description: input.detail_description,
                        instruction: input.instruction,
                        images: path,
                        data: {
                            update: {
                                size: input?.data?.size,
                                weight: input?.data?.weight,
                                power: input?.data?.power,
                            },
                        },
                    },
                });
                await this.prisma.file.create({
                    data: {
                        filename: filename,
                        mimetype,
                        size: 12,
                        path,
                        blogId: null,
                        categoryId: (await product).category_id,
                    },
                });

                return product;
            } else {
                const product = await this.prisma.category.update({
                    where: { category_id: input.category_id },
                    data: {
                        category_name: input.category_name,
                        category_status: input.category_status,
                        detail_description: input.detail_description,
                        instruction: input.instruction,
                        data: {
                            update: {
                                size: input?.data?.size,
                                weight: input?.data?.weight,
                                power: input?.data?.power,
                            },
                        },
                    },
                });
                return product;
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}
