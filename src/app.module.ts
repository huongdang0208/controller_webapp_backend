import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { PassportModule } from "@nestjs/passport";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

import { AppResolver } from "./app.resolver";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { UserModule } from "./modules/user/user.module";
import { AuthenticateModule } from "./modules/authenticate/authenticate.module";
import { BlogModule } from "./modules/blog/blog.module";
import { ProductModule } from "./modules/product/product.module";
import { appConfig } from "./config";
import { MailModule } from "./modules/mail/mail.module";
import { OrderModule } from "./modules/order/order.module";
import { ContactModule } from './modules/contact/contact.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig],
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            playground: false,
            sortSchema: true,
            introspection: true,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: "smtp.yandex.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "no-reply@danghoangphuc.com",
                        pass: "cuteRabbit@artart123",
                    },
                },
                defaults: {
                    from: '"No Reply" <no-reply@danghoangphuc.com>',
                },
                template: {
                    dir: process.cwd() + "/templates/",
                    adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
        PassportModule.register({ session: true }),
        PrismaModule,
        UserModule,
        AuthenticateModule,
        BlogModule,
        ProductModule,
        MailModule,
        OrderModule,
        ContactModule,
    ],
    controllers: [],
    providers: [AppResolver],
})
export class AppModule {}
