import { Module } from "@nestjs/common";
import { ApiModule } from "../api/api.module";
import { DeviceResolver } from "./device.resolver";
import { DeviceService } from "./device.service";

@Module({
    providers: [DeviceResolver, DeviceService],
    imports: [ApiModule],
})
export class DeviceModule {}
