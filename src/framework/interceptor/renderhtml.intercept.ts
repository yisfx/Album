import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";



export class RenderHtmlIntercepteor implements NestInterceptor {
  constructor() { }




  intercept(context: ExecutionContext, next: CallHandler<any>): any {
    let reply = context.switchToHttp().getResponse();
    let request = context.switchToHttp().getRequest();
    let element = (context.getHandler() as any)
      .__Root_React_Element__;
    if (!element) {
      return next.handle();
    }


    return "";
  }


}