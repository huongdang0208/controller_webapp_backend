import { Field, InputType, Int } from "@nestjs/graphql";
import { OrderEnum } from "../../../utils/types/order.enum";

@InputType()
export class FilterProductInput {
    @Field(() => OrderEnum, { nullable: true })
    order?: OrderEnum;

    @Field(() => Int, { nullable: true })
    page: number;

    @Field(() => Int, { nullable: true })
    perPage: number;

    @Field(() => String, { nullable: true })
    status: string;
}