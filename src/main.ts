import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { attachContextMiddleware } from './logger/async-context';
import { CustomLogger } from './logger/custom-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: false });

  app.use(attachContextMiddleware);

  app.useLogger(app.get(CustomLogger));

  await app.listen(3000);
}
bootstrap();
