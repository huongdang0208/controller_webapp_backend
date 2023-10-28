import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { CreateBlogInput } from '../blog/dto/create-blog.input';
import { Blog } from "../blog/entities/blog.entity";

@Injectable()
export class BlogApiService {
    constructor(private httpService: HttpService, private readonly config: ConfigService) {}
    private readonly base_url = this.config.get('API_BASE_URL')
    async createBlogApi (params: CreateBlogInput): Promise<Blog> {
        const { data } = await firstValueFrom(
            this.httpService.post(`${this.base_url}/blog/create`, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        console.log(data);
        return data;
    }
}