import { Module } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogResolver } from "./blog.resolver";
import { ApiModule } from "../api/api.module";

@Module({
    providers: [BlogResolver, BlogService],
    imports: [ApiModule],
})
export class BlogModule {}
