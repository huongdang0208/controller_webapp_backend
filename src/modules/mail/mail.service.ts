import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Order } from '../order/entities/order.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  // async sendUserOrder(user: User, order: Order) {
  //   this
  //     .mailerService
  //     .sendMail({
  //       to: 'test@nestjs.com', // list of receivers
  //       from: 'noreply@nestjs.com', // sender address
  //       subject: 'Testing Nest MailerModule ✔', // Subject line
  //       text: 'welcome', // plaintext body
  //       html: '<b>welcome</b>', // HTML body content
  //     })
  //     .then((success) => {
  //       console.log(success)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     });
  // }

  async sendUserOrder(user: User, order: Order) {

    await this.mailerService.sendMail({
      to: "thuhuong002008@gmail.com",
      from: "no-reply@danghoangphuc.com", // override default from
      subject: 'Welcome to Davinci! Confirm your Email',
      template: 'order', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.username,
        user,
        order,
      },
    });
  }
}
