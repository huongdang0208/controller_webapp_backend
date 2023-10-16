import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../guards/auth/auth.guard';
import { ContactService } from './contact.service';
import { ContactInput } from './dto/contact.input';
import { Contact } from './entities/contact.entity';

@Resolver()
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Mutation(() => Contact)
  @UseGuards(JwtAuthGuard)
  async create_contact (@Args('input') input: ContactInput) {
    return this.contactService.createContact(input)
  }
}
