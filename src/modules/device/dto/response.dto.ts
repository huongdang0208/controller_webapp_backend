import { Field, ObjectType } from "@nestjs/graphql";
import { PaginateInfo } from "../../../common/dto/paginateInfo.response";
import { DeviceResponse } from "../entities/device.entity";

@ObjectType()
export class DevicesResponse {
    @Field(() => [DeviceResponse], { nullable: true })
    items: DeviceResponse[];

    // @Field(() => PaginateInfo, { nullable: true })
    // paginateInfo: PaginateInfo;
}
