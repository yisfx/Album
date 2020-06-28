import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
let ass=require("../conf/assets.conf")

@Injectable()
export class LayoutInterceptor implements NestInterceptor{
    intercept(context:ExecutionContext,next:CallHandler):Observable<any>{

        const route= Reflect.getMetadata("__route__",context.getHandler());
        
        let content=ass[route]
        if(!content)
            content=ass[404];
        const response = context.switchToHttp().getResponse();
        return next
                .handle()
                .pipe(
                    tap(()=>{
                        if (!!route) {
                            
                            response.locals = {
                                ...response.locals,
                                script:"/kjsdfh/"+content
                              };
                          }

                    })
                );
    }
}