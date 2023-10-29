import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { AuthApiService } from "./auth.service";
import { BlogApiService } from "./blog.service";

@Module({
    providers: [AuthApiService, BlogApiService],
    imports: [HttpModule],
    exports: [AuthApiService, BlogApiService],
})
export class ApiModule {}
