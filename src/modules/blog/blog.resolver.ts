import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BlogService } from "./blog.service";
import { Blog } from "./entities/blog.entity";
import { CreateBlogInput } from "./dto/create-blog.input";
import { UpdateBlogInput } from "./dto/update-blog.input";
import { FilterBlogInput } from "./dto/query-blog.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../guards/auth/auth.guard";
import { Role } from "../../utils/types/role.enum";
import { Roles } from "../../decorators/roles/roles.decorator";
import { BlogsResponse } from "./dto/query-blog.response";

@Resolver(() => Blog)
export class BlogResolver {
    constructor(private readonly blogService: BlogService) {}

    @Query(() => BlogsResponse)
    async blogs(@Args("filter", { nullable: true }) filter?: FilterBlogInput) {
        return this.blogService.queryAllBlogs(filter);
    }

    @Query(() => Blog)
    async blog(@Args("blog_id") blog_id: number) {
        return this.blogService.findBlogById(blog_id);
    }

    @Mutation(() => Blog)
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    async create_blog(@Args("createBlogInput") createBlogInput: CreateBlogInput) {
        return this.blogService.createBlog(createBlogInput);
    }

    @Mutation(() => Blog)
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    async update_blog(@Args("blog_id") blog_id: number, @Args("updateBlogInput") updateBlogInput: UpdateBlogInput) {
        return this.blogService.updateBlog(blog_id, updateBlogInput);
    }

    @Mutation(() => Boolean)
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    async delete_blog(@Args("blog_id") blog_id: number) {
        return this.blogService.deleteBlog(blog_id);
    }
}
