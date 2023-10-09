import { ObjectType, Field, Int } from "@nestjs/graphql";
import { FileUpload } from "../../file/entities/file.entity";

@ObjectType()
export class Blog {
    @Field(() => Int, { nullable: true })
    blog_id: number;

    @Field(() => String, { nullable: false })
    title: string;

    @Field(() => String, { nullable: false })
    description: string;

    @Field(() => FileUpload, { nullable: true })
    images: FileUpload;

    @Field({ nullable: true })
    created_at: Date;

    @Field({ nullable: true })
    updated_at: Date;
}
