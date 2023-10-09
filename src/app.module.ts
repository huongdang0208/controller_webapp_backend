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
import { FileModule } from "./modules/file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AppController } from "./app.controller";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./guards/roles/roles.guard";
import { JwtAuthGuard } from "./guards/auth/auth.guard";

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
        PassportModule.register({ session: true }),
        PrismaModule,
        UserModule,
        AuthenticateModule,
        BlogModule,
        ProductModule,
        MailModule,
        OrderModule,
        FileModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
