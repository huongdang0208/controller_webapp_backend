import { Module } from "@nestjs/common";
import { MqttService } from "./mqtt.service";

@Module({
    providers: [MqttService],
    imports: [],
})

export class MqttModule {}