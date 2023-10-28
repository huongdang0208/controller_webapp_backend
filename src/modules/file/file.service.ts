import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GraphQLError } from "graphql";
import { catchError, firstValueFrom } from "rxjs";
import { CREATE_FILE } from "../../constants/file.constanst";
import { AxiosError } from "axios";

@Injectable()
export class FileService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    async saveFile(file: Express.Multer.File) {
        const { filename, path, size, mimetype } = file;

        // replace \\ -> /
        const newPath = path.replace(/\\/g, "/");

        const cdnPath = `cdn/${newPath}`;

        try {
            // return this.prisma.file.create({
            //     data: {
            //         filename: filename,
            //         mimetype: mimetype,
            //         size: size,
            //         path: newPath,
            //         cdn_path: cdnPath,
            //     },
            // });

            const res = await firstValueFrom(
                this.httpService
                    .post(`${this.configService.get("API_BASE_URL")}/${CREATE_FILE}`, {
                        filename: filename,
                        mimetype: mimetype,
                        size: size,
                        path: newPath,
                        cdn_path: cdnPath,
                    })
                    .pipe(
                        catchError((err: AxiosError) => {
                            throw err;
                        }),
                    ),
            );

            if (!res) {
                throw new GraphQLError("Internal error");
            }
            return res;
        } catch (e) {
            throw new GraphQLError(e);
        }
    }

    async saveFiles(files: Array<Express.Multer.File>) {
        try {
            const data = [];

            for (const file of files) {
                const { filename, path, size, mimetype } = file;

                // replace \\ -> /
                const newPath = path.replace(/\\/g, "/");

                const cdnPath = `cdn/${newPath}`;

                data.push({
                    filename: filename,
                    mimetype: mimetype,
                    size: size,
                    path: newPath,
                    cdn_path: cdnPath,
                });
            }

            // await this.prisma.file.createMany({
            //     data: data,
            // });

            return data;
        } catch (e) {
            throw new GraphQLError(e);
        }
    }
}
