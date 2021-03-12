import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SysConfig } from "../../conf/site.config";
let ass = require("../../conf/assets.conf")
let css = require("../../conf/assets.css")
import metadata from "../decorators/constants";

@Injectable()
export class LayoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const route = Reflect.getMetadata(metadata.Route_Name_Metadata, context.getHandler());
        let content = ass[route]
        if (!content)
            content = ass[404];
        let cssFile = css[route];
        const response = context.switchToHttp().getResponse();
        return next
            .handle()
            .pipe(
                tap(() => {
                    if (!!route) {

                        response.locals = {
                            ...response.locals,
                            script: SysConfig.VisualStaticPath + "/" + content,
                            css: !!cssFile ? SysConfig.VisualStaticPath + "/" + cssFile : undefined,
                        };
                    }

                })
            );
    }
}