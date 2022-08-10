import { ConsoleLogger, LoggerService } from '@nestjs/common';
import { getAsyncContext } from './async-context';

export class CustomLogger extends ConsoleLogger {
  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: any[]): void;
  log(message: unknown, context?: unknown, ...rest: unknown[]): void {
    const loggerMessage = `${this.formatRequestId()}${message}`;

    if (context) super.log(loggerMessage, context);
    else super.log(loggerMessage);
  }

  error(message: string, stack?: string, context?: string): void;
  error(message: string, ...optionalParams: any[]): void;
  error(messageOrError: string | Error, stack?: unknown, context?: unknown): void {
    const loggerMessage = `${this.formatRequestId()}${messageOrError}`;

    if (messageOrError instanceof Error) {
      super.error(this.formatRequestId() + messageOrError, messageOrError.stack);
    } else if (context) {
      super.error(loggerMessage, stack, context);
    } else {
      super.error(loggerMessage, stack);
    }
  }

  private getRequestId() {
    const ctx = getAsyncContext();
    return ctx?.reqId;
  }

  private formatRequestId() {
    const reqId = this.getRequestId();
    return reqId ? `[${reqId}]: ` : '';
  }
}
