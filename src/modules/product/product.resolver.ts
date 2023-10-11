import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
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

@Resolver()
export class ProductResolver {
    constructor(private readonly productService: ProductService) {}

    @Query(() => [Product])
    @UseGuards(JwtAuthGuard)
    async products(@Args("filter") filter: FilterProductInput) {
        const products = await this.productService.queryAllProduct(filter);
        return products || [];
    }

    @Mutation(() => Product)
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    async create_product(@Args("input") input: CreateProductInput) {
        return this.productService.createProduct(input);
    }

    @Mutation(() => Product)
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    async update_product(@Args("productId") productId: number, @Args("input") input: UpdateProductInput) {
        return this.productService.updateProduct(productId, input);
    }

    @Mutation(() => Boolean)
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    async delete_blog(@Args("productId") productId: number) {
        return this.productService.deleteProduct(productId);
    }
}
