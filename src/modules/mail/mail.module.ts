import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { join } from "path";

@Module({
    imports: [
        MailerModule.forRoot({
            // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
            // or
            transport: {
                host: "smtp.mailersend.net",
                port: 587,
                secure: true,
                auth: {
                    user: "MS_2fPVtS@dhpgo.com",
                    pass: "IlijVLxNPC8mWjOn",
                },
                tls:  { ciphers: 'SSLv3' },
            },
            defaults: {
                from: '"No Reply" <MS_2fPVtS@dhpgo.com>',
            },
            template: {
                dir: join(__dirname, "templates"),
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService], // 👈 export for DI
})
export class MailModule {}
