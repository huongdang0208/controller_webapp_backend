import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Blog {
    @Field(() => Int, { nullable: true })
    blog_id: number;

    @Field(() => String, { nullable: false })
    title: string;

    @Field(() => String, { nullable: false })
    description: string;

    @Field(() => String, { nullable: true })
    images: string;

    @Field({ nullable: true })
    created_at: Date;

    @Field({ nullable: true })
    updated_at: Date;
}
