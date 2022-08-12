import { AsyncLocalStorage } from 'async_hooks';

type AsyncContext = {
  reqId: string;
};

export const executionContext = new AsyncLocalStorage<AsyncContext>();

export function getAsyncContext() {
  return executionContext.getStore();
}
