import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class FileUpload {
    @Field(() => Number)
    file_id: number;

    @Field(() => String, { nullable: false })
    filename: string;

    @Field(() => String, { nullable: false })
    mimetype: string;

    @Field(() => Number)
    size: number;

    @Field(() => String)
    path: string;

    @Field(() => String)
    cdn_path: string;

    @Field({ nullable: true })
    created_at: Date;

    @Field({ nullable: true })
    updated_at: Date;
}
