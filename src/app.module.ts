import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppRepository } from './app.repository';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger-module.module';

@Module({
  imports: [LoggerModule],
  controllers: [AppController],
  providers: [AppService, AppRepository],
})
export class AppModule {}
