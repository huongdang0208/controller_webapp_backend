import { registerEnumType } from "@nestjs/graphql";

export enum OrderEnum {
    ASC = "asc",
    DESC = "desc",
}

registerEnumType(OrderEnum, {
    name: "OrderEnum",
});
