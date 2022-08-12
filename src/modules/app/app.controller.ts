import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomLogger } from '../../logger/custom-logger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly logger: CustomLogger) {}

  @Get()
  async getHello() {
    this.logger.log('Log in controller');
    return this.appService.getHello();
  }
}
