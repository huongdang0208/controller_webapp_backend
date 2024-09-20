import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";
import mqtt from "mqtt/*";
import { error } from 'console';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MqttService {
    private client: mqtt.MqttClient;
    private readonly configService: ConfigService;
    private readonly prisma: PrismaService;

    constructor(configService: ConfigService, prisma: PrismaService) {
        this.configService = configService;
        this.prisma = prisma;
    }

    OnModuleInit() {
        this.client = mqtt.connect(<string>this.configService.get("MQTT_BROKER"), {
            username: this.configService.get("MQTT_USERNAME"),
            password: this.configService.get("MQTT_PASSWORD"),
        });

        this.client.on("connect", () => {
            console.log("Connected to MQTT broker");
        });
        
        this.client.on("error", (error) => {    
            console.error("Error connecting to MQTT broker", error);
        });

        this.client.on('message', this.handleMqttMessage.bind(this));
    }

    OnModuleDestroy() {
        this.client.end();
    }

    subscribe(topic: string, callback: (message: string) => void) {
        this.client.subscribe(topic, (error) => {
            if (error) {
                console.error("Error subscribing to topic", error);
            }
        });

        this.client.on("message", (receivedTopic, message) => {
            if (receivedTopic === topic) {
                callback(message.toString());
            }
        });
    }

    publish(topic: string, message: string) {
        this.client.publish(topic, message, (error) => {
            if (error) {
                console.error("Error publishing message", error);
            }
        });
    }

    private async handleMqttMessage(topic: string, message: Buffer) {
        const messageStr = message.toString();
        const commandData = JSON.parse(messageStr);

        await this.prisma.command.create({
            data: {
                deviceID: commandData.deviceID,
                command: commandData.command,
                sender: commandData.sender,
                receiver: commandData.receiver,
                userID: commandData.userID,
            }
        });
    }
}