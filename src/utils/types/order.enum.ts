import { registerEnumType } from "@nestjs/graphql";

export enum OrderEnum {
    ASC = "asc",
    DESC = "desc",
}

registerEnumType(OrderEnum, {
    name: "OrderEnum",
});

export enum OrderStatusEnum {
    PENDING = "pending",
    PROCESSING = "processing",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
}

registerEnumType(OrderStatusEnum, {
    name: "OrderStatusEnum",
});
