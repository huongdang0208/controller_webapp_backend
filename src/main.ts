import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

process.env.TZ = "Asia/Ho_Chi_Minh";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(8080);

    Logger.log(`🚀  Server running on ${await app.getUrl()}`, "Bootstrap");
    Logger.log(`🚀  Graphql running on ${await app.getUrl()}/graphql`, "Bootstrap");
}

bootstrap();
