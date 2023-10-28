import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ServeStaticModule } from "@nestjs/serve-static";
import { PassportModule } from "@nestjs/passport";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { join } from "path";
import { HttpModule } from "@nestjs/axios";

import { UserModule } from "./modules/user/user.module";
import { AuthenticateModule } from "./modules/authenticate/authenticate.module";
import { BlogModule } from "./modules/blog/blog.module";
import { ProductModule } from "./modules/product/product.module";
import { appConfig, mailConfig } from "./config";
import { MailModule } from "./modules/mail/mail.module";
import { OrderModule } from "./modules/order/order.module";
import { FileModule } from "./modules/file/file.module";
import { AppController } from "./app.controller";
import { ContactModule } from "./modules/contact/contact.module";
import { ApiModule } from './modules/api/api.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig, mailConfig],
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
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "public/uploads"),
            serveRoot: "/public/uploads",
            serveStaticOptions: {
                index: false,
                dotfiles: "ignore",
            },
        }),
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                baseURL: configService.get("API_BASE_URL"),
                timeout: 5000,
                maxRedirects: 5,
            }),
            inject: [ConfigService],
        }),
        PassportModule.register({ session: true }),
        UserModule,
        AuthenticateModule,
        BlogModule,
        ProductModule,
        MailModule,
        OrderModule,
        FileModule,
        ContactModule,
        ApiModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
