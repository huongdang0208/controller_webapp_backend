import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "../../decorators/roles/roles.decorator";
import { Role } from "../../utils/types/role.enum";
import { JwtAuthGuard } from "../../guards/auth/auth.guard";
import { AirMonitorService } from "./air-monitor.service";
import { AirMonitorDataResponse } from "./entities/air-monitor.entity";
import { AirMonitorInput } from "./dto/input.dto";
import { AirMonitorsResponse } from "./entities/air-monitors.entity";
import { QueryInput } from "./dto/query.dto";

@Resolver()
export class AirMonitorResolver {
    constructor(private readonly airMonitorService: AirMonitorService) {}

    @Query(() => AirMonitorsResponse)
    async allMonitors(@Args("filter", { nullable: true }) filter?: QueryInput) {
        return this.airMonitorService.allData(filter);
    }

    @Mutation(() => AirMonitorDataResponse)
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    async create_monitor(@Args("input") input: AirMonitorInput) {
        return this.airMonitorService.create(input);
    }
}
