import { Module } from "@nestjs/common";
import { ApiModule } from "../api/api.module";
import { AirMonitorResolver } from "./air-monitor.resolver";
import { AirMonitorService } from "./air-monitor.service";

@Module({
    providers: [AirMonitorService, AirMonitorResolver],
    imports: [ApiModule],
})
export class AirMonitorModule {}
