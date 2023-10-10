import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GraphQLError } from "graphql";

@Injectable()
export class FileService {
    constructor(private prisma: PrismaService) {}

    async saveFile(file: Express.Multer.File) {
        const { filename, path, size, mimetype } = file;
        console.log(path)

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
}
