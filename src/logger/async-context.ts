import { AsyncLocalStorage } from 'async_hooks';
import { NextFunction, Request } from 'express';
import { randomUUID } from 'crypto';

type AsyncContext = {
  reqId: string;
};

const executionContext = new AsyncLocalStorage<AsyncContext>();

export function attachContextMiddleware(req: Request, res: Response, next: NextFunction) {
  const asyncContext = { reqId: randomUUID() };
  executionContext.run(asyncContext, () => next());
}

export function getAsyncContext() {
  return executionContext.getStore();
}
