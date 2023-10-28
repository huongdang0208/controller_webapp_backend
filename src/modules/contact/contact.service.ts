import { Injectable } from "@nestjs/common";
import { ContactInput } from "./dto/contact.input";
import { GraphQLError } from "graphql";
import { MailService } from "../mail/mail.service";

@Injectable()
export class ContactService {
    constructor(
        private mailService: MailService,
    ) {}
    async createContact(input: ContactInput) {
        try {
            // const contact = await this.prisma.contact.create({
            //     data: {
            //         ...input,
            //     },
            // });
            // if (contact) {
            //     console.log('😎 😎 😎 ', contact)
            //     this.mailService.sendContactInfo(input);
            //     return { isSuccess: true };
            // }
            // return { isSuccess: false };
        } catch (err) {
            throw new GraphQLError(err);
        }
    }
}
