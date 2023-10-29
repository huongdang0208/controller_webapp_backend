import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderResolver } from "./order.resolver";
import { MailModule } from "../mail/mail.module";
import { ProductModule } from "../product/product.module";
import { ApiModule } from "../api/api.module";

@Module({
    providers: [OrderResolver, OrderService],
    imports: [MailModule, ProductModule, ApiModule],
})
export class OrderModule {}
