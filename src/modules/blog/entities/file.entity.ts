import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class FileUpload {
    @Field(() => Int)
    file_id: number;

    @Field(() => String, { nullable: false })
    filename: string;

    @Field(() => String, { nullable: false })
    mimetype: string;

    @Field(() => Int)
    size: number;

    @Field({ nullable: true })
    created_at: Date;

    @Field({ nullable: true })
    updated_at: Date;
}
