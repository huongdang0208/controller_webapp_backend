import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { join } from "path";

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                transport: {
                    host: config.get<string>("mail.smtp.host"),
                    port: config.get<number>("mail.smtp.port"),
                    secure: false,
                    auth: {
                        user: config.get<string>("mail.smtp.auth.user"),
                        pass: config.get<string>("mail.smtp.auth.pass"),
                    },
                },
                defaults: {
                    from: `"${config.get("mail.default.name")}" <${config.get("mail.default.from")}>`,
                },
                template: {
                    dir: join(__dirname, 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
