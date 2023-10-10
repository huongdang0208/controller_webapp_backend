import { Field, ObjectType } from "@nestjs/graphql";
import { IsNumber, Min } from "class-validator";

@ObjectType()
export class PaginateInfo {
    @Field()
    @IsNumber()
    totalCount!: number;

    @Field({ nullable: true })
    @IsNumber()
    @Min(1)
    currentPage?: number;

    @Field()
    @IsNumber()
    totalPage!: number;
}
