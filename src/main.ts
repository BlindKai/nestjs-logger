import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { CustomLogger } from './logger/custom-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(new CustomLogger());

  await app.listen(3000);
}
bootstrap();
