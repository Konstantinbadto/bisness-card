# Цифровая визитка специалиста

Одностраничная карточка-портфолио с бэкендом на **NestJS + GraphQL + Prisma**,
контейнеризованная через **Docker**. Разработка ведётся с использованием
**Git** и **Claude Code** (см. `CLAUDE.md` и `.claude/commands/`).

**Стек:** Git · TypeScript · Node.js · NestJS · Prisma · GraphQL · Docker · Claude Code

---

## Как это устроено

```
┌────────────┐   GraphQL   ┌───────────────────┐   Prisma   ┌────────────┐
│ index.html │ ──────────▶ │ NestJS (Resolver)  │ ─────────▶ │ PostgreSQL │
│ (визитка)  │ ◀────────── │ /graphql endpoint  │ ◀───────── │            │
└────────────┘             └───────────────────┘            └────────────┘
```

- `public/index.html` — фронтенд визитки (тема «терминал/IDE»): вкладки
  README / stack.json / experience.log / projects, данные запрашиваются
  через GraphQL-запрос `specialist`.
- `src/profile/` — GraphQL-резолвер и сервис, читающие данные через Prisma.
- `prisma/schema.prisma` — модель данных (`Specialist`, `Skill`, `Project`, `ExperienceItem`).
- `prisma/seed.ts` — здесь редактируется содержимое **вашей** визитки (имя, роль, навыки, проекты, опыт).

## Быстрый старт (Docker — рекомендуется)

```bash
git clone <адрес-вашего-репозитория>
cd digital-business-card
docker-compose up --build
```

После старта:
- Визитка: **http://localhost:3000**
- GraphQL Playground: **http://localhost:3000/graphql**

Контейнер `app` при запуске сам применяет схему (`prisma migrate deploy`) и
загружает демо-данные (`prisma:seed`) в базу `db` (PostgreSQL).

## Локальный запуск без Docker

Требуется установленный PostgreSQL (или переключите `provider` в
`prisma/schema.prisma` на `sqlite` для запуска вообще без БД-сервера).

```bash
npm install
cp .env.example .env        # укажите свою DATABASE_URL
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

## Как сделать визитку своей

Отредактируйте `prisma/seed.ts` — имя, роль, контакты, `bio`, списки
`skills`, `projects`, `experience` — и перезапустите `npm run prisma:seed`
(или `docker-compose up --build` заново). Модель данных менять не нужно.

## Получение ссылок для сдачи задания

Этот код мной подготовлен и проверен на сборку (`npm install`, `nest build`
проходят). Два запрошенных пункта — ссылка на просмотр и ссылка на Git —
получаются в вашем аккаунте за пару шагов, я не могу создать их от вашего
имени:

**1. Ссылка на Git (исходный код)**
```bash
cd digital-business-card
git init
git add .
git commit -m "feat: цифровая визитка (NestJS + GraphQL + Prisma + Docker)"
git branch -M main
git remote add origin https://github.com/<ваш-логин>/digital-business-card.git
git push -u origin main
```
Ссылка для сдачи: `https://github.com/<ваш-логин>/digital-business-card`

**2. Ссылка на просмотр (деплой)**
Простейший вариант — Railway или Render (у обоих есть бесплатный tier,
поддержка Docker Compose/Dockerfile «из коробки»):
1. Зарегистрируйтесь и подключите ваш GitHub-репозиторий.
2. Выберите деплой по `Dockerfile`, добавьте сервис PostgreSQL (переменная
   `DATABASE_URL` подставится автоматически или задайте вручную по образцу
   из `.env.example`).
3. После деплоя сервис выдаст публичный URL вида
   `https://digital-business-card-production.up.railway.app` — это и есть
   ссылка «для просмотра».

## Использование Claude Code в проекте

`CLAUDE.md` содержит контекст проекта для Claude Code, а в
`.claude/commands/` — готовые команды (`/review-pr`, `/add-skill`),
которые ускоряют ревью изменений и добавление новых навыков в визитку.

## Структура проекта

```
src/
  app.module.ts
  main.ts
  prisma.service.ts
  profile/
    models/profile.model.ts
    profile.resolver.ts
    profile.service.ts
prisma/
  schema.prisma
  seed.ts
public/
  index.html
Dockerfile
docker-compose.yml
CLAUDE.md
.claude/commands/
```
