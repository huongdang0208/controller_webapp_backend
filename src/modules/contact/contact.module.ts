import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolver';
import { MailModule } from '../mail/mail.module';

@Module({
  providers: [ContactResolver, ContactService],
  imports: [MailModule]
})
export class ContactModule {}
