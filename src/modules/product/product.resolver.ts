import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";
import { CreateProductInput } from "./dto/create-product.input";
import { Role } from "../../utils/types/role.enum";
import { UpdateProductInput } from "./dto/update-product.input";
import { Roles } from "../../decorators/roles/roles.decorator";
import { UseGuards } from "@nestjs/common";
import { FilterProductInput } from "./dto/filter.input";
import { JwtAuthGuard } from "../../guards/auth/auth.guard";
import { RolesGuard } from "../../guards/roles/roles.guard";
import { FileUpload } from "../file/entities/file.entity";

@Resolver()
export class ProductResolver {
    constructor(private readonly productService: ProductService) {}

    @Query(() => [Product])
    @UseGuards(JwtAuthGuard)
    async products(@Args('filter') filter: FilterProductInput) {
        const products = await this.productService.queryAllProduct(filter);
        return products || [];
    }

    @Mutation(() => Product)
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
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
    @UseGuards(RolesGuard)
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
