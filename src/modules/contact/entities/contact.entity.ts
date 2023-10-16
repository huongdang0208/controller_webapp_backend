import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Contact {
    @Field(() => Boolean, { nullable: false })
    isSuccess: boolean;
}
