import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LogoutResponse {
    @Field(() => Boolean)
    isLogout: boolean;
}
