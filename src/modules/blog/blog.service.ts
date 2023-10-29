import { Injectable } from "@nestjs/common";
import { CreateBlogInput } from "./dto/create-blog.input";
import { FilterBlogInput } from "./dto/query-blog.input";
import { UpdateBlogInput } from "./dto/update-blog.input";
import { GraphQLError } from "graphql";
import { BlogApiService } from "../api/blog.service";

@Injectable()
export class BlogService {
    constructor(private readonly blogApiService: BlogApiService) {}

    async findBlogById(blog_id: number) {
        try {
            return this.blogApiService.findBlogByIdApi(blog_id);
        } catch (err) {
            throw new Error(err);
        }
    }

    async queryAllBlogs({ page = 1, perPage = 10, order, search }: FilterBlogInput) {
        try {
            return this.blogApiService.queryAllBlogs({ page, perPage, order, search } as FilterBlogInput);
        } catch (err) {
            throw new Error(err);
        }
    }

    async createBlog(input: CreateBlogInput) {
        try {
            return this.blogApiService.createBlogApi(input);
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async updateBlog(blogId: number, input: UpdateBlogInput) {
        try {
            return this.blogApiService.updateBlogApi(input, blogId);
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteBlog(blog_id: number) {
        try {
            return this.blogApiService.deleteBlogApi(blog_id);
        } catch (error) {
            throw new GraphQLError(error);
        }
    }
}
