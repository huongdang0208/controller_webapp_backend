import { Controller, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";
import { JwtAuthGuard } from "../../guards/auth/auth.guard";

@Controller("file")
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    @UseGuards(JwtAuthGuard)
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.saveFile(file);
    }

    @Post("uploadMany")
    @UseInterceptors(FilesInterceptor("files"))
    @UseGuards(JwtAuthGuard)
    uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
        return this.fileService.saveFiles(files);
    }
}
