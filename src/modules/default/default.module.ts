import { Module } from "@nestjs/common";
import { DefaultController } from "./default.controller";
import { HttpClient } from "../../framework/httpclient/http.client";
import { JPGController } from "./jpg.controller";

@Module({
    imports: [],
    controllers: [DefaultController,
        JPGController],
    providers: [HttpClient],
})

export class DefaultModule { }