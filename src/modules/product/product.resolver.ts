import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";

import { AccessTokenGuard } from "../../guards/access-jwt.authenticate.guard";
import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";
import { CreateProductInput } from "./dto/create-product.input";
import { FileUpload } from "../blog/entities/file.entity";

@Resolver()
export class ProductResolver {
    constructor(private readonly productService: ProductService) {}

    @Mutation(() => Product)
    @UseGuards(AccessTokenGuard)
    async create_product(@Args("input") input: CreateProductInput, @Args({ name: "image", type: () => GraphQLUpload, nullable: true, defaultValue: null }) image: FileUpload | null) {
        return this.productService.createProduct(input, image);
    }
}
