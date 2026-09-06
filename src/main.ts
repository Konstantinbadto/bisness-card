import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Визитка запущена: http://localhost:${port}`);
  console.log(`🔎 GraphQL Playground: http://localhost:${port}/graphql`);
}

bootstrap();
