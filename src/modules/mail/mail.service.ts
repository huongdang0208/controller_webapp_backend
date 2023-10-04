import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Order } from '../order/entities/order.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserOrder(user: User, order: Order) {

    await this.mailerService.sendMail({
      to: "thuhuong002008@gmail.com",
      from: "MS_2fPVtS@dhpgo.com", // override default from
      subject: 'Welcome to Davinci! Confirm your Email',
      template: 'order.hbs', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.username,
        user,
        order,
      },
    });
  }
}
