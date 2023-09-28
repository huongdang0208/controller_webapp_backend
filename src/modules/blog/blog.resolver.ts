import { Resolver, Mutation, Args, Context, Query } from "@nestjs/graphql";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { UseGuards } from "@nestjs/common";

import { BlogService } from "./blog.service";
import { Blog } from "./entities/blog.entity";
import { CreateBlogInput } from "./dto/create-blog.input";
import { UpdateBlogInput } from './dto/update-blog.input'
import { FileUpload } from './entities/file.entity'
import { AccessTokenGuard } from '../../guards/access-jwt.authenticate.guard';
import { FilterBlogInput } from "./dto/query-blog.input";

@Resolver(() => Blog)
export class BlogResolver {
    constructor(private readonly blogService: BlogService) {}

    @Query(() => Blog)
    @UseGuards(AccessTokenGuard)
    blogs (@Args('filter') filter: FilterBlogInput) {
      return this.blogService.queryAllBlogs(filter)
    }

    @Mutation(() => Blog)
    @UseGuards(AccessTokenGuard)
    async create_blog(
      @Args("createBlogInput") createBlogInput: CreateBlogInput,
      @Context() context,
      @Args({ name: "image", type: () => GraphQLUpload, nullable: true, defaultValue: null }) image: FileUpload | null
    ) {

        return this.blogService.createBlog( createBlogInput, image);
    }

    @Mutation(() => Blog)
    @UseGuards(AccessTokenGuard)
    async update_blog(
      @Args("updateBlogInput") updateBlogInput: UpdateBlogInput,
      @Context() context,
      @Args({ name: "image", type: () => GraphQLUpload, nullable: true, defaultValue: null }) image: FileUpload | null
    ) {
        return this.blogService.createBlog( updateBlogInput, image);
    }
}
