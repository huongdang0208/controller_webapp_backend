import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { ContactInput } from "../contact/dto/contact.input";
import { Contact } from "../contact/entities/contact.entity";

@Injectable()
export class ContactApiService {
    constructor(
        private readonly httpService: HttpService,
        private config: ConfigService,
    ) {}
    private readonly base_url = this.config.get("API_BASE_URL");

    async createContact(params: ContactInput): Promise<Contact> {
        const { data } = await firstValueFrom(
            this.httpService.post(`${this.base_url}/contact`, params).pipe(
                catchError((err: AxiosError) => {
                    throw err;
                }),
            ),
        );
        return data;
    }
}
