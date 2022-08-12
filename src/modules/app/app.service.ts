import { Injectable, LoggerService } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { CustomLogger } from '../../logger/custom-logger';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository, private readonly logger: CustomLogger) {
    this.logger.setContext(AppService.name)
  }

  async getHello() {
    this.logger.log('Log in service');
    return this.appRepository.getHello();
  }
}
