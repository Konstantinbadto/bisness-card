require('dotenv/config');
const { defineConfig, env } = require('@prisma/config');

module.exports = defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // Используем DIRECT_URL, а если его нет — фоллбек на DATABASE_URL или пустую строку для сборки Docker
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || '',
  },
});
