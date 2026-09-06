require('dotenv/config');
const { defineConfig, env } = require('prisma/config');

module.exports = defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    // Prisma 7 больше не сидирует автоматически при `migrate dev`/`db push` —
    // сидирование теперь отдельный явный шаг: `npx prisma db seed`
    // (или `npm run prisma:seed`), который запускает именно эту команду.
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // CLI-командам (generate/db push/migrate) нужно прямое соединение —
    // pooled-URL (pgbouncer, напр. Neon "-pooler") не держит сессию
    // достаточно долго для схемных операций (см. ошибку P1017).
    // Поэтому здесь — DIRECT_URL, а не DATABASE_URL.
    // Для локального Docker-Postgres без pooler-а можно указать
    // в .env одно и то же значение в обеих переменных.
    url: env('DIRECT_URL'),
  },
});
