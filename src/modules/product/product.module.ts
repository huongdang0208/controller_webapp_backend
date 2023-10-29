import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductResolver } from "./product.resolver";
import { ApiModule } from "../api/api.module";

@Module({
    providers: [ProductResolver, ProductService],
    exports: [ProductService],
    imports: [ApiModule],
})
export class ProductModule {}
