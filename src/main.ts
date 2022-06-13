import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // IMPORTANT: this allow call API from another local nodejs server
  await app.listen(4000);
}
bootstrap();
