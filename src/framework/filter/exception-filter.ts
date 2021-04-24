import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    constructor() {
        super();
    }

    catch(exception: any, host: ArgumentsHost) {
        //process
        throw new exception("error");
    }
}