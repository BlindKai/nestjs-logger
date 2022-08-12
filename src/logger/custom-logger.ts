import { ConsoleLogger, Injectable, Logger, LoggerService, Scope } from '@nestjs/common';
import { getAsyncContext } from './async-context';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger implements LoggerService {
  log(message: unknown, context?: unknown, ...rest: unknown[]): void {
    const serializable: Record<string, any> = { message };
    const requestId = this.getRequestId();

    if (requestId) serializable.requestId = requestId;

    super.log(JSON.stringify(serializable), this.context || context);
  }

  error(message: string, error?: any, context?: unknown): void {
    const serializable: Record<string, any> = { message, stack: error?.stack };
    const requestId = this.getRequestId();

    if (requestId) serializable.requestId = requestId;

    const errorOrStack = error instanceof Error ? error.stack : error;

    super.error(JSON.stringify(serializable), this.context || context);
  }

  private getRequestId() {
    const ctx = getAsyncContext();
    return ctx?.reqId;
  }
}
