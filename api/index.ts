import 'dotenv/config';
import 'reflect-metadata';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import serverless from 'serverless-http';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';

// Serverless-функции — без состояния между вызовами, но Vercel переиспользует
// «тёплый» инстанс контейнера между соседними запросами. Кэшируем собранное
// Nest-приложение в переменной модуля, чтобы не пересобирать его каждый раз —
// это резко ускоряет все запросы, кроме самого первого (холодный старт).
let cachedHandler: ReturnType<typeof serverless> | null = null;

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.enableCors();
  await app.init();
  return serverless(expressApp);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cachedHandler) {
    cachedHandler = await bootstrap();
  }
  return cachedHandler(req as any, res as any);
}
