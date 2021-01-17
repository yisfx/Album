import { Module } from "@nestjs/common";
import { HttpClient } from "../../framework/http.client";
import { AdminController } from "./admin.controller";

@Module(
    {
        imports: [],
        controllers: [AdminController],
        providers: [HttpClient]
    }
)

export class AdminModule { }