import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomLogger } from './logger/custom-logger';

@Injectable()
export class AppRepository {
  constructor(private readonly logger: CustomLogger) {}

  async getHello() {
    this.logger.log('Log in repository');

    await Promise.resolve().then(() => {
      this.logger.log('Promise #1');
    });

    await Promise.resolve().then(() => {
      this.logger.log('Promise #2');
    });

    await Promise.resolve().then(() => {
      try {
        this.logger.log('Promise #3');
        throw new Error("Didn't go well :C");
      } catch (error) {
        this.logger.error(error);
        throw new NotFoundException('Something is definitely wrong');
      }
    });

    await Promise.resolve().then(() => {
      this.logger.log('Promise #4');
    });

    return 'Hello World!';
  }
}
