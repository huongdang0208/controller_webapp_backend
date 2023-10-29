import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { CreateBlogInput } from "../blog/dto/create-blog.input";
import { FilterBlogInput } from "../blog/dto/query-blog.input";
import { BlogsResponse } from "../blog/dto/query-blog.response";
import { UpdateBlogInput } from "../blog/dto/update-blog.input";
import { Blog } from "../blog/entities/blog.entity";

@Injectable()
export class BlogApiService {
    constructor(
        private httpService: HttpService,
        private readonly config: ConfigService,
    ) {}
    private readonly base_url = this.config.get("API_BASE_URL");

    async createBlogApi(params: CreateBlogInput): Promise<Blog> {
        const { data } = await firstValueFrom(
            this.httpService.post(`${this.base_url}/blog/create`, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }

    async updateBlogApi(params: UpdateBlogInput, blogId: number): Promise<Blog> {
        const { data } = await firstValueFrom(
            this.httpService.patch(`${this.base_url}/blog/${blogId}`, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }

    async deleteBlogApi(blogId: number): Promise<boolean> {
        const { data } = await firstValueFrom(
            this.httpService.delete(`${this.base_url}/blog/${blogId}`).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }

    async findBlogByIdApi(blogId: number): Promise<Blog> {
        const { data } = await firstValueFrom(
            this.httpService.get(`${this.base_url}/blog/${blogId}`).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }

    async queryAllBlogs (filter: FilterBlogInput): Promise<BlogsResponse> {
        const { data } = await firstValueFrom(
            this.httpService.get(`${this.base_url}/blog/all-blogs`, {params: {filter}}).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }
}
