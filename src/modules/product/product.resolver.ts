import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";
import { CreateProductInput } from "./dto/create-product.input";
import { FileUpload } from "../blog/entities/file.entity";
import { JwtAuthGuard } from "../../guards/auth/auth.guard";

@Resolver()
export class ProductResolver {
    constructor(private readonly productService: ProductService) {}

    @Mutation(() => Product)
    @UseGuards(JwtAuthGuard)
    async create_product(
        @Args("input") input: CreateProductInput,
        @Args({
            name: "image",
            type: () => GraphQLUpload,
            nullable: true,
            defaultValue: null,
        })
        image: FileUpload | null,
    ) {
        return this.productService.createProduct(input, image);
    }
}
