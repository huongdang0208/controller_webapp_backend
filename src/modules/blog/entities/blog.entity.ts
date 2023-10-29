import { ObjectType, Field, Int } from "@nestjs/graphql";
import { FileUpload } from "../../file/entities/file.entity";

@ObjectType()
export class Blog {
    @Field(() => Int, { nullable: true })
    id: number;

    @Field(() => String, { nullable: false })
    title: string;

    @Field(() => String, { nullable: false })
    description: string;

    @Field(() => FileUpload, { nullable: true })
    file_blog_imageTofile: FileUpload;

    @Field({ nullable: true })
    created_date: string;

}
