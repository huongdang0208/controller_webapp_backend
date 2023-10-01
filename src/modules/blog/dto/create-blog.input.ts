import { InputType, Field, Int } from "@nestjs/graphql";
import { IsString } from "class-validator";
// import * as Prisma from '@prisma/client'

@InputType()
export class CreateBlogInput {
    @Field(() => Int, { nullable: true })
    blog_id: number;

    @IsString()
    @Field(() => String, { nullable: false })
    title: string;

    @Field(() => String, { nullable: false })
    description: string;

    // @Field()
    // category: Prisma.Blog

    @Field({ nullable: true })
    created_at: Date;

    @Field({ nullable: true })
    updated_at: Date;
}
