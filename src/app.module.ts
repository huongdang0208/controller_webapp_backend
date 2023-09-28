import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { PassportModule } from "@nestjs/passport";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

import { AppResolver } from "./app.resolver";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { UserModule } from "./modules/user/user.module";
import { AuthenticateModule } from "./modules/authenticate/authenticate.module";
import { BlogModule } from './modules/blog/blog.module';
import { ProductModule } from './modules/product/product.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            context: ({ req }) => ({ req }),
            autoSchemaFile: true,
            playground: false,
            sortSchema: true,
            introspection: true,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        // ServeStaticModule.forRoot({
        //     rootPath: join(__dirname, '..', 'images'),
        //   }),
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
