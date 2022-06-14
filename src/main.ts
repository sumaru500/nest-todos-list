import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GatewayModule } from './gateway/gateway.module'

global.gateway_port = 4001;
global.app_port = 4000;


async function bootstrapGateway() {
  const app = await NestFactory.create(GatewayModule);
  app.enableCors(); // IMPORTANT: this allow call API from another local nodejs server
  await app.listen(4001);
  console.log(`Gateway is running on: ${await app.getUrl()}`);
}

async function bootstrapApp() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // IMPORTANT: this allow call API from another local nodejs server
  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

(async () => {
  await bootstrapGateway();
  await bootstrapApp();
})()

