# CLAUDE.md

Этот файл — контекст для **Claude Code**, который используется в разработке этого
проекта как AI-напарник (ревью, миграции, рефакторинг, генерация тестов).

## О проекте

Цифровая визитка специалиста: NestJS-бэкенд с GraphQL API поверх Prisma ORM,
отдающий данные для одностраничной карточки-портфолио (`public/index.html`).
Контейнеризовано через Docker/Docker Compose (app + PostgreSQL).

## Стек

- **Git** — контроль версий, ветвление по фичам, осмысленные коммиты.
- **TypeScript** — строгая типизация на бэкенде.
- **Node.js / NestJS** — сервер и модульная архитектура (модуль `profile`).
- **Prisma** — схема данных и типобезопасный клиент (`prisma/schema.prisma`).
- **GraphQL** (code-first, `@nestjs/graphql` + Apollo) — единственная точка входа `/graphql`.
- **Docker** — `Dockerfile` (multi-stage) + `docker-compose.yml`.
- **Claude Code** — используется при разработке (см. `.claude/commands/`).

## Структура

```
src/
  app.module.ts          — сборка модулей, GraphQL и статики
  main.ts                — точка входа
  prisma.service.ts       — обёртка PrismaClient
  profile/
    models/profile.model.ts  — GraphQL-типы (code-first)
    profile.resolver.ts      — query `specialist`
    profile.service.ts       — чтение данных через Prisma
prisma/
  schema.prisma           — модели Specialist / Skill / Project / ExperienceItem
  seed.ts                 — тестовые данные визитки (отредактируйте под себя)
public/
  index.html               — фронтенд карточки, запрашивает /graphql
```

## Частые команды для Claude Code

- `npm run start:dev` — запуск в watch-режиме.
- `npm run prisma:generate` — перегенерировать Prisma Client после правок схемы.
- `npm run prisma:seed` — заполнить БД данными визитки.
- `docker-compose up --build` — поднять приложение + PostgreSQL целиком.

## Соглашения

- Любые изменения модели данных → сначала правим `prisma/schema.prisma`,
  затем `npx prisma migrate dev --name <описание>`.
- GraphQL-типы держим в `src/profile/models/*.model.ts`, схема генерируется
  автоматически в `src/schema.gql` (в git не коммитится).
- Коммиты — в формате Conventional Commits (`feat:`, `fix:`, `chore:`…).

## Готовые команды Claude Code

См. `.claude/commands/`:
- `/review-pr` — ревью незакоммиченных изменений на соответствие стеку и соглашениям проекта.
- `/add-skill` — добавить новую запись в раздел skills визитки (модель, seed, фронтенд).
