import { Field, ObjectType } from "@nestjs/graphql";
import { Blog } from "../entities/blog.entity";
import { PaginateInfo } from "../../../common/dto/paginateInfo.response";

@ObjectType()
export class BlogsResponse {
    @Field(() => [Blog], { defaultValue: [] })
    blogs: Blog[];

    @Field(() => PaginateInfo)
    paginateInfo: PaginateInfo;
}
