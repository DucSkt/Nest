import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    Logger,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  @Catch()
  export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest();
      const response = ctx.getResponse();
      const status = exception.getStatus();
      const errorResponse = {
        code: status,
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message: (status !== HttpStatus.INTERNAL_SERVER_ERROR) ? (`${exception.message.error} 11 http-err` || `${exception.message} 22 http-err` || null) : 'Internal server error 33 http-err',
      };

      response.status(status).json(errorResponse);
    }
  }