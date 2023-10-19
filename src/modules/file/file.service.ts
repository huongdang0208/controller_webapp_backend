import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GraphQLError } from "graphql";

@Injectable()
export class FileService {
    constructor(private prisma: PrismaService) {}

    async saveFile(file: Express.Multer.File) {
        const { filename, path, size, mimetype } = file;

        // replace \\ -> /
        const newPath = path.replace(/\\/g, "/");

        const cdnPath = `cdn/${newPath}`;

        try {
            return this.prisma.file.create({
                data: {
                    filename: filename,
                    mimetype: mimetype,
                    size: size,
                    path: newPath,
                    cdn_path: cdnPath,
                },
            });
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

            await this.prisma.file.createMany({
                data: data,
            });

            return data;
        } catch (e) {
            throw new GraphQLError(e);
        }
    }
}
