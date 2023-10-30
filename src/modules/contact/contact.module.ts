import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolver';
import { MailModule } from '../mail/mail.module';
import { ApiModule } from '../api/api.module';

@Module({
  providers: [ContactResolver, ContactService],
  imports: [MailModule, ApiModule]
})
export class ContactModule {}
