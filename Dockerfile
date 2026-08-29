# --- Stage 1: сборка ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
COPY . .

RUN npx prisma generate
RUN npm run build

# Компилируем seed.ts в JavaScript, чтобы в рантайме не нужен был ts-node
RUN npx tsc prisma/seed.ts --outDir dist/prisma --target es2022 --module commonjs

# --- Stage 2: рантайм ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
COPY prisma ./prisma/

# Устанавливаем только production-зависимости (никаких dev-пакетов)
RUN npm install --omit=dev && npx prisma generate

# Копируем скомпилированное приложение и сид
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

EXPOSE 3000

# Запускаем миграции, скомпилированный сид через node и само приложение
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./prisma/schema.prisma && node dist/prisma/seed.js && node dist/src/main.js"]
