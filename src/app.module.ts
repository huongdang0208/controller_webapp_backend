import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";

import { AppService } from "./app.service";
import { AppResolver } from "./app.resolver";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { DateScalar } from "./date.scalar";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), "src/schema.gql"),
            sortSchema: true,
        }),
        PrismaModule,
        UserModule,
    ],
    controllers: [],
    providers: [AppService, AppResolver, DateScalar],
})
export class AppModule {}

// through the forRoot method we have access to the apollo server
// and can transmit a configuration object
