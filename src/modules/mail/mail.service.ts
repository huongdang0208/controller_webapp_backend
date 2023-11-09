import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ContactInput } from "../contact/dto/contact.input";
import { GraphQLError } from "graphql";

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        private readonly config: ConfigService,
    ) {}

    async sendUserOrder(order: any) {
        console.log(order);
        try {
            await this.mailerService.sendMail({
                to: this.config.get<string>("mail.default.to"),
                subject: "Welcome to Davinci! Confirm your Email",
                template: "order", // `.hbs` extension is appended automatically
                context: {
                    // ✏️ filling curly brackets with content
                    name: "Confirm order form",
                    order: {
                        email: order.email,
                        phone: order.phone,
                        address: order.address,
                        product_name: order.product_name,
                        quantity: order.quantity,
                        created_date: order.created_date,
                      },
                },
            });
        } catch (err) {
            console.log('mail service error', err);
            throw new GraphQLError(err);
        }
    }

    async sendContactInfo(contactInfo: ContactInput) {
        console.log("😎 ", contactInfo);
        await this.mailerService.sendMail({
            to: this.config.get<string>("mail.default.to"),
            subject: "Confirm your request contact to Davinci!",
            template: "contact", // `.hbs` extension is appended automatically
            context: {
                name: contactInfo.name,
                contactInfo: contactInfo,
            },
        });
    }
}
