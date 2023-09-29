import { Injectable } from "@nestjs/common";
import { createWriteStream } from "fs";

import { FileUpload } from "../../utils/types/data.interface";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async createProduct(input: CreateProductInput, image: FileUpload) {
        try {
            if (image) {
                const { createReadStream, filename, mimetype } = await image;
                const path = `./images/${filename}`;

                await createReadStream().pipe(createWriteStream(path));

                const product = this.prisma.category.create({
                    data: {
                        category_name: input.category_name,
                        detail_description: input.detail_description,
                        instruction: input.instruction,
                        // data: {
                        //     create: {
                        //         size: input?.data?.size,
                        //         weight: input?.data?.weight,
                        //         power: input?.data?.power,
                        //     },
                        // },
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
                        // data: {
                        //     create: {
                        //         size: input?.data?.size,
                        //         weight: input?.data?.weight,
                        //         power: input?.data?.power,
                        //     },
                        // },
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
                throw new Error('Field category_id is required, but not provided')
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
                    }
                })

                // const dataCategory = await this.prisma.data.update({
                //     where: {
                //         data_id: product
                //     }
                // })
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}
