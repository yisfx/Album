import { Module } from "@nestjs/common";
import { HttpClient } from "../../framework/httpclient/http.client";
import { LoginController } from "./login.controller";


@Module(
    {
        imports: [],
        controllers: [LoginController],
        providers: [HttpClient]
    }
)

export class LoginModule { }