import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { AuthApiService } from "./auth.service";
import { BlogApiService } from "./blog-api.service";
import { ProductApiService } from "./product-api.service";
import { OrderApiService } from "./order-api.service";
import { ContactApiService } from "./contact-api.service";

@Module({
    providers: [AuthApiService, BlogApiService, ProductApiService, OrderApiService, ContactApiService],
    imports: [HttpModule],
    exports: [AuthApiService, BlogApiService, ProductApiService, OrderApiService, ContactApiService],
})
export class ApiModule {}
