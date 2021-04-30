import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from "@nestjs/common";
import { rejects } from "assert";
import { resolve } from "path";
import { from, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { SysConfig } from "../../conf/site.config";
let ass = require("../../conf/assets.conf")
let css = require("../../conf/assets.css")
import metadata from "../decorators/constants";
import reactView from "../template/ReactView";

@Injectable()
export class LayoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const route = Reflect.getMetadata(metadata.Route_Name_Metadata, context.getHandler());
        let content = ass[route]
        if (!content)
            content = ass[404];
        let cssFile = css[route];
        const initalData = next.handle();

        const response = context.switchToHttp().getResponse();
        if (!route) {
            response.header("content-type", "text/json; charset=utf-8")
            return initalData
        }

        const html = reactView({
            css: cssFile ? SysConfig.VisualStaticPath + "/" + cssFile : undefined,
            initData: initalData,
            script: SysConfig.VisualStaticPath + "/" + content,
            response
        })
        response.header("content-type", "text/html; charset=utf-8")
        html.subscribe(content => response.send(content));
        return html
    }
}