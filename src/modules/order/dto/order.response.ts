import { Field, ObjectType } from "@nestjs/graphql";
import { PaginateInfo } from "../../../common/dto/paginateInfo.response";
import { Order } from "../entities/order.entity";

@ObjectType()
export class OrdersResponse {
    @Field(() => [Order], { nullable: false })
    orders: Order[];

    @Field(() => PaginateInfo)
    paginateInfo: PaginateInfo;
}