import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { AuthApiService } from "./auth.service";

@Module({
    providers: [AuthApiService],
    imports: [HttpModule],
    exports: [AuthApiService],
})
export class ApiModule {}
