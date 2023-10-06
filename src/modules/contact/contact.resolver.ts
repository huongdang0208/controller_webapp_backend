import { Resolver } from '@nestjs/graphql';
import { ContactService } from './contact.service';

@Resolver()
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}
}
