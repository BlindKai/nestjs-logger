import { Injectable, LoggerService } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { CustomLogger } from './logger/custom-logger';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository, private readonly loggerService: CustomLogger) {}

  async getHello() {
    this.loggerService.log('Log in service');
    return this.appRepository.getHello();
  }
}
