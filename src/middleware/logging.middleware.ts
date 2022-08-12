import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { CustomLogger } from 'src/logger/custom-logger';
import { getAsyncContext } from './../logger/async-context';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {
    this.logger.setContext(RequestLoggingMiddleware.name);
  }

  use(request: Request, response: Response, next: NextFunction) {
    const context = getAsyncContext();

    const { method, headers, path, params, query, body, cookies } = request;

    this.logger.debug(
      JSON.stringify({ requestId: context.reqId, method, headers, path, params, query, body, cookies }),
    );

    next();
  }
}
