import { Injectable } from "@nestjs/common";
import { createWriteStream } from "fs";

import { FileUpload } from "../../utils/types/data.interface";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBlogInput } from "./dto/create-blog.input";
import { FilterBlogInput } from "./dto/query-blog.input";
import { UpdateBlogInput } from "./dto/update-blog.input";
import { removeVietnameseTones } from "../../utils/util/search";

@Injectable()
export class BlogService {
    constructor(private prisma: PrismaService) {}

    async findBlogById(blog_id: number) {
        try {
            const blog = await this.prisma.blog.findUnique({ where: { blog_id } });
            if (!blog) throw new Error("Cannot found the resources");
            return blog;
        } catch (err) {
            throw new Error(err);
        }
    }

    async queryAllBlogs(filter: FilterBlogInput) {
        try {
            const blogs = await this.prisma.blog.findMany({
                skip: filter.page,
                take: filter.perPage,
                where: {
                  title: {
                    contains: removeVietnameseTones(filter?.search) || ''
                  }
                },
            });
            console.log('***', blogs)
            if (blogs) return blogs;
        } catch (err) {
            throw new Error(err);
        }
    }

    async createBlog(input: CreateBlogInput, image: FileUpload) {
        try {
            if (image) {
                const { createReadStream, filename, mimetype } = await image;
                const path = `./images/${filename}`;

                await createReadStream().pipe(createWriteStream(path));

                const blog = this.prisma.blog.create({
                    data: {
                        title: input.title,
                        description: input.description,
                        images: path,
                    },
                });
                await this.prisma.file.create({
                    data: {
                        filename: filename,
                        mimetype: mimetype,
                        size: 12,
                        path: path,
                        blogId: (await blog).blog_id,
                        categoryId: null
                    },
                });


                if (blog) return blog;
            } else {
                const blog = this.prisma.blog.create({
                    data: {
                        title: input.title,
                        description: input.description,
                        images: "",
                    },
                });

                return blog;
            }
        } catch (err) {
            console.log("***", err);
            throw new Error(err);
        }
    }

    async updateBlog(input: UpdateBlogInput, image: FileUpload) {
        try {
            if (!input.blog_id) {
                throw new Error("Field blog_id is required but got null");
            }
            if (image) {
                const { createReadStream, filename, mimetype } = await image;
                const path = `./images/blog/${filename}`;

                await createReadStream().pipe(createWriteStream(path));

                const blog = await this.prisma.blog.update({
                    where: { blog_id: input.blog_id },
                    data: {
                        ...input
                    },
                });

                await this.prisma.file.create({
                    data: {
                        filename: filename,
                        mimetype: mimetype,
                        size: 12,
                        path,
                        blogId: (await blog).blog_id,
                        categoryId: null
                    },
                });

                return blog;
            }
            const blog = await this.prisma.blog.update({
                where: { blog_id: input.blog_id },
                data: {
                    title: input.title,
                    description: input.description,
                    updatedAt: Date(),
                },
            });
            return blog;
        } catch (err) {
            throw new Error(err);
        }
    }
}
