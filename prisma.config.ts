require('dotenv/config');
const { defineConfig } = require('@prisma/config');

const dbUrl = process.env.DIRECT_URL || process.env.DATABASE_URL || '';

module.exports = defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: dbUrl,
  },
});
