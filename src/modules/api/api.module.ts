import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { AuthApiService } from "./auth.service";
import { BlogApiService } from "./blog-api.service";
import { ProductApiService } from "./product-api.service";

@Module({
    providers: [AuthApiService, BlogApiService, ProductApiService],
    imports: [HttpModule],
    exports: [AuthApiService, BlogApiService, ProductApiService],
})
export class ApiModule {}
