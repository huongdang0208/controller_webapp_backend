import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";

@Controller("file")
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.saveFile(file);
    }

    @Post("uploadMany")
    @UseInterceptors(FilesInterceptor("files"))
    uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
        console.log(files);
    }
}
