import { InputType, Field } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class CreateBlogInput {
    @IsString()
    @Field(() => String, { nullable: false })
    title: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    description: string;

    @Field(() => Number, { nullable: true })
    @IsOptional()
    images: number;

    // @Field()
    // category: Prisma.Blog
}
