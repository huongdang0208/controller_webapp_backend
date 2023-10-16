import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Order } from "../order/entities/order.entity";
import { User } from "../user/entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { ContactInput } from "../contact/dto/contact.input";

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        private readonly config: ConfigService,
    ) {}

    async sendUserOrder(user: User, order: Order) {
        await this.mailerService.sendMail({
            to: this.config.get<string>("mail.default.to"),
            subject: "Welcome to Davinci! Confirm your Email",
            template: "order", // `.hbs` extension is appended automatically
            context: {
                // ✏️ filling curly brackets with content
                name: user.username,
                user,
                order,
            },
        });
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
