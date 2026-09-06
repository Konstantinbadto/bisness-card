# --- Stage 1: сборка ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

# --- Stage 2: рантайм ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma
RUN npm install --omit=dev && npx prisma generate

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["sh", "-c", "npx prisma db push --accept-data-loss; npx prisma db seed; node dist/main"]
