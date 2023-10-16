import { Field, InputType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class ContactInput {
    @Field(() => String, { nullable: false })
    name: string;

    @Field(() => String, { nullable: false })
    @IsEmail()
    email: string;

    @Field(() => String, { nullable: false })
    phone: string;

    @Field(() => String, { nullable: false })
    title: string;

    @Field(() => String, { nullable: false })
    content: string;
}
