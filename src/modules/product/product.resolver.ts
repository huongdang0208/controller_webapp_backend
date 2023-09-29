import { Args, Mutation, Resolver } from "@nestjs/graphql";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";
import { CreateProductInput } from "./dto/create-product.input";
import { FileUpload } from "../blog/entities/file.entity";
import { Role } from "../../utils/types/role.enum";
import { UpdateProductInput } from "./dto/update-product.input";
import { Roles } from "../../decorators/roles/roles.decorator";

@Resolver()
export class ProductResolver {
    constructor(private readonly productService: ProductService) {}

    @Mutation(() => Product)
    @Roles(Role.Admin)
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

    @Mutation(() => Product)
    @Roles(Role.Admin)
    async update_product(
        @Args("input") input: UpdateProductInput,
        @Args({
            name: "image",
            type: () => GraphQLUpload,
            nullable: true,
            defaultValue: null,
        })
        image: FileUpload | null,
    ) {
        return this.productService.updateProduct(input, image);
    }
}
