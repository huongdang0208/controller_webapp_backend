import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { MailModule } from '../mail/mail.module';

@Module({
  providers: [OrderResolver, OrderService],
  imports: [MailModule]
})
export class OrderModule {}
