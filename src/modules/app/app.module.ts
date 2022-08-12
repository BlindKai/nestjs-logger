import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppRepository } from './app.repository';
import { AppService } from './app.service';
import { config } from '../../database/ormconfig.';
import { LoggerModule } from '../../logger/logger-module.module';
import { AttachContextMiddleware } from 'src/middleware/context.middleware';
import { RequestLoggingMiddleware } from 'src/middleware/logging.middleware';

@Module({
  imports: [LoggerModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService, AppRepository],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AttachContextMiddleware, RequestLoggingMiddleware).forRoutes('*');
  }
}
