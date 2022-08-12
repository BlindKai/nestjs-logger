import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { executionContext } from './../logger/async-context';

@Injectable()
export class AttachContextMiddleware implements NestMiddleware {
  use(request: any, response: any, next: (error?: any) => void) {
    const asyncContext = { reqId: randomUUID() };
    executionContext.run(asyncContext, () => next());
  }
}
