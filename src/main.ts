import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем CORS для всех источников
  app.enableCors();

  const port = process.env.PORT ?? 3000;

  // Передаем '0.0.0.0', чтобы слушать все сетевые интерфейсы внутри контейнера
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Сервер успешно запущен на порту: ${port}`);
  console.log(`🔎 GraphQL эндпоинт доступен по адресу: /graphql`);
}

bootstrap();
