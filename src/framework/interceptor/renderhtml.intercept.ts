import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { ComponentType } from "react";
import { Observable } from "rxjs";
import reactView from "../ReactView";


export class RenderHtmlIntercepteor implements NestInterceptor {
  constructor() { }

  protected render(
    element: ComponentType,
    next: CallHandler
  ): Observable<any> {

    return reactView(

      options
    )(element).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }


  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    let reply = context.switchToHttp().getResponse();
    let request = context.switchToHttp().getRequest();
    let element = (context.getHandler() as any)
      .__Root_React_Element__;
    if (!element) {
      return next.handle();
    }


    return this.render(element, options, next);
  }


}