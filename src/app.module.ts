import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { PassportModule } from "@nestjs/passport";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { AppResolver } from "./app.resolver";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { UserModule } from "./modules/user/user.module";
import { AuthenticateModule } from "./modules/authenticate/authenticate.module";
import { BlogModule } from "./modules/blog/blog.module";
import { ProductModule } from "./modules/product/product.module";
import { appConfig } from "./config";

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
        PassportModule.register({ session: true }),
        PrismaModule,
        UserModule,
        AuthenticateModule,
        BlogModule,
        ProductModule,
    ],
    controllers: [],
    providers: [AppResolver],
})
export class AppModule {}
