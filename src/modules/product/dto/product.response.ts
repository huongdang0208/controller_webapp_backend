import { Field, ObjectType } from "@nestjs/graphql";
import { PaginateInfo } from "../../../common/dto/paginateInfo.response";
import { Product } from "../entities/product.entity";

@ObjectType()
export class ProductsResponse {
    @Field(() => [Product], {defaultValue: []})
    products: Product[]

    @Field(() => PaginateInfo)
    paginateInfo: PaginateInfo
}