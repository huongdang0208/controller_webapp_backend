import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { ensureDirSync } from "fs-extra";
import { HttpModule } from '@nestjs/axios';

@Module({
    providers: [FileService],
    controllers: [FileController],
    imports: [
    MulterModule.registerAsync({
            useFactory: () => ({
                storage: diskStorage({
                    destination: (_, file, callback) => {
                        const year = dayjs().format("YYYY");
                        const month = dayjs().format("MM");

                        const uploadPath = `./public/uploads/${year}/${month}`;

                        ensureDirSync(uploadPath); // Ensure the directory exists

                        callback(null, uploadPath);
                    },
                    filename: (_, file, callback) => {
                        const randomName = uuidv4();
                        return callback(null, `${randomName}${extname(file.originalname)}`);
                    },
                }),
            }),
        }),
        HttpModule
    ],
})
export class FileModule {}
