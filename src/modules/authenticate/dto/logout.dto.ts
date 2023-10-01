import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class LogoutInput {
    @Field(() => String)
    refreshToken: string;
}

@ObjectType()
export class LogoutResponseBlock {
    @Field(() => String, { nullable: true })
    message?: string;
}
