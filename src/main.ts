import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import session from "express-session";
import passport from "passport";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

process.env.TZ = "Asia/Ho_Chi_Minh";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    const configService = app.get(ConfigService);

    app.use(
        session({
            name: "DAVINCI_SESSION_ID",
            secret: configService.get("session.secret"),
            resave: false,
            // when user is login, session is created, and if not, we don't
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
            },
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(8080, "0.0.0.0");

    Logger.log(`🚀  Server running on ${await app.getUrl()}`, "Bootstrap");
    Logger.log(`🚀  Graphql running on ${await app.getUrl()}/graphql`, "Bootstrap");
}

bootstrap();
