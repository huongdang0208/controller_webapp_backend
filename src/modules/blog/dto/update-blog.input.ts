import { InputType, Field, Int } from "@nestjs/graphql";
// import * as Prisma from '@prisma/client'

@InputType()
export class UpdateBlogInput {
    @Field(() => Int, { nullable: false })
    blog_id: number;

    @Field(() => String, { nullable: true })
    title: string;

    @Field(() => String, { nullable: true })
    description: string;

    // @Field()
    // category: Prisma.Blog

    @Field({ nullable: true })
    created_at: Date;

    @Field({ nullable: true })
    updated_at: Date;
}
