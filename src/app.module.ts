import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { PassportModule } from "@nestjs/passport";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { UserModule } from "./modules/user/user.module";
import { AuthenticateModule } from "./modules/authenticate/authenticate.module";
import { BlogModule } from "./modules/blog/blog.module";
import { ProductModule } from "./modules/product/product.module";
import { appConfig, mailConfig } from "./config";
import { MailModule } from "./modules/mail/mail.module";
import { OrderModule } from "./modules/order/order.module";

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
        PassportModule.register({ session: true }),
        PrismaModule,
        UserModule,
        AuthenticateModule,
        BlogModule,
        ProductModule,
        MailModule,
        OrderModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
