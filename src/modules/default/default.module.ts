import { Module } from "@nestjs/common";
import { DefaultController } from "./default.controller";
import { HttpClient } from "../../framework/http.client";



@Module({
    imports:[],
    controllers:[DefaultController],
    providers:[HttpClient],
})

export class DefaultModule {}