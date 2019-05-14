import { Injectable, NestInterceptor, ExecutionContext, Logger, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    // log thời gian get data
    intercept(context: ExecutionContext,  next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const now = Date.now();

        return next.handle().pipe(
            tap(() => Logger.log(
                `BBBBBBBBBBB${method} ${url} ${Date.now() - now}ms`,
                context.getClass().name,
            )),
        );
    }
}