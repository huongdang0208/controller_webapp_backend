import { Injectable } from "@nestjs/common";
import { CreateBlogInput } from "./dto/create-blog.input";
import { FilterBlogInput } from "./dto/query-blog.input";
import { UpdateBlogInput } from "./dto/update-blog.input";
import { removeVietnameseTones } from "../../utils/util/search";
import { GraphQLError } from "graphql";

@Injectable()
export class BlogService {
    constructor() {}

    async findBlogById(blog_id: number) {
        try {

        } catch (err) {
            throw new Error(err);
        }
    }

    async queryAllBlogs({ page = 1, perPage = 10, order, search }: FilterBlogInput) {
        const skip = (page - 1) * perPage;

        try {
            // let config: Prisma.BlogFindManyArgs = {
            //     skip: skip || 0,
            //     take: perPage || 10,
            //     include: {
            //         images: true,
            //     },
            // };

            // if (search) {
            //     config = {
            //         ...config,
            //         where: {
            //             title: {
            //                 contains: removeVietnameseTones(search) || "",
            //             },
            //         },
            //     };
            // }

            // if (order) {
            //     config = {
            //         ...config,
            //         orderBy: {
            //             title: order,
            //         },
            //     };
            // }

            // const blogs = await this.prisma.blog.findMany(config);

            // // Paginate info
            // const totalBlog = await this.prisma.blog.count();
            // const totalPage = Math.ceil(totalBlog / perPage);

            // return {
            //     blogs,
            //     paginateInfo: {
            //         totalCount: totalBlog,
            //         currentPage: page,
            //         totalPage,
            //     },
            // };
        } catch (err) {
            throw new Error(err);
        }
    }

    async createBlog(input: CreateBlogInput) {
        try {
            // return this.prisma.blog.create({
            //     data: {
            //         title: input.title,
            //         description: input.description,
            //         images_id: input.images,
            //     },
            //     include: {
            //         images: true,
            //     },
            // });
        } catch (err) {
            throw new GraphQLError(err);
        }
    }

    async updateBlog(blogId: number, input: UpdateBlogInput) {
        try {
            // return this.prisma.blog.update({
            //     where: {
            //         blog_id: blogId,
            //     },
            //     data: {
            //         title: input.title,
            //         description: input.description,
            //         images_id: input.images,
            //     },
            //     include: {
            //         images: true,
            //     },
            // });
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteBlog(blog_id: number) {
        try {
            // const deletedBlog = await this.prisma.blog.delete({ where: { blog_id } });

            // return !!deletedBlog;
        } catch (error) {
            throw new GraphQLError(error);
        }
    }
}
