import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    constructor() {
        super()
    }
    catch(exception: any, host: ArgumentsHost) {

        throw new HttpException(JSON.stringify({
            status: 500,
            error: 'oops',
        }), 500);
    }
}