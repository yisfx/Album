import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";


@Injectable()
export class LayoutInterceptor implements NestInterceptor{
    intercept(context:ExecutionContext,next:CallHandler):Observable<any>{

        const route= Reflect.getMetadata("__route__",context.getHandler());

        return next
                .handle()
                .pipe(
                    tap(()=>{
                        if (!!route) {
                            const response = context.switchToHttp().getResponse();
                            response.locals = {
                                ...response.locals,
                                ["data"]: route,
                              };
                            // console.log(response)
                          }

                    })
                );
    }
}