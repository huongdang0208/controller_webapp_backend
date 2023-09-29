import { Resolver, Mutation, Args, Context, Query } from "@nestjs/graphql";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { UseGuards } from "@nestjs/common";

import { BlogService } from "./blog.service";
import { Blog } from "./entities/blog.entity";
import { CreateBlogInput } from "./dto/create-blog.input";
import { UpdateBlogInput } from "./dto/update-blog.input";
import { FileUpload } from "./entities/file.entity";
import { FilterBlogInput } from "./dto/query-blog.input";
import { JwtAuthGuard } from "../../guards/auth/auth.guard";

@Resolver(() => Blog)
export class BlogResolver {
    constructor(private readonly blogService: BlogService) {}

    @Query(() => Blog)
    @UseGuards(JwtAuthGuard)
    blogs(@Args("filter") filter: FilterBlogInput) {
        return this.blogService.queryAllBlogs(filter);
    }

    @Mutation(() => Blog)
    @UseGuards(JwtAuthGuard)
    async create_blog(
        @Args("createBlogInput") createBlogInput: CreateBlogInput,
        @Context() context,
        @Args({
            name: "image",
            type: () => GraphQLUpload,
            nullable: true,
            defaultValue: null,
        })
        image: FileUpload | null,
    ) {
        return this.blogService.createBlog(createBlogInput, image);
    }

    @Mutation(() => Blog)
    @UseGuards(JwtAuthGuard)
    async update_blog(
        @Args("updateBlogInput") updateBlogInput: UpdateBlogInput,
        @Context() context,
        @Args({
            name: "image",
            type: () => GraphQLUpload,
            nullable: true,
            defaultValue: null,
        })
        image: FileUpload | null,
    ) {
        console.log(context);
        return this.blogService.createBlog(updateBlogInput, image);
    }
}
