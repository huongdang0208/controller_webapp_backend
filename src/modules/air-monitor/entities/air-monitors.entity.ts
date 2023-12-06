import { Field, ObjectType } from "@nestjs/graphql";
import { PaginateInfo } from "../../../common/dto/paginateInfo.response";
import { AirMonitorDataResponse } from "./air-monitor.entity";

@ObjectType()
export class AirMonitorsResponse {
    @Field(() => [AirMonitorDataResponse], {nullable: true})
    devices: AirMonitorDataResponse[];

    @Field(() => PaginateInfo, { nullable: true })
    paginateInfo: PaginateInfo;
}