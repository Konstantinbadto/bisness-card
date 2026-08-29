import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ⚠️ Замените данные ниже на свои — это ваша визитка.
async function main() {
  await prisma.specialist.deleteMany();

  await prisma.specialist.create({
    data: {
      fullName: 'Айрих Константин',
      role: 'Backend / Full-stack Developer',
      tagline: 'Строю API и бэкенд-сервисы на TypeScript-стеке - от схемы данных до контейнера в проде',
      location: 'Симфереполь, Россия (удалённо)',
      avatarUrl: 'https://avatars.githubusercontent.com/u/180270919?s=400&u=a00b8fea232d974f20db31e88d8c25590aed58ba&v=4',
      email: 'ajrih.k.i.23@gmail.com',
      telegram: '@LangJinrang',
      github: 'https://github.com/Konstantinbadto',
      website: null,
      bio: 'Full-stack / Backend Developer Разрабатываю бэкенд-сервисы на Node.js и NestJS с использованием TypeScript. Проектирую базы данных с Prisma ORM и строию гибкие API-слои на GraphQL и REST. Настраиваю воспроизводимую сборку и деплой через Docker и Docker Compose. Использую Claude Code как AI-ассистента для ускорения рутины, написания тестов и отладки контейнеризованных окружений.',
      skills: {
        create: [
          { name: 'TypeScript', category: 'language', level: 5 },
          { name: 'Node.js', category: 'language', level: 5 },
          { name: 'NestJS', category: 'framework', level: 5 },
          { name: 'GraphQL', category: 'framework', level: 4 },
          { name: 'Prisma ORM', category: 'database', level: 4 },
          { name: 'PostgreSQL', category: 'database', level: 4 },
          { name: 'Docker', category: 'devops', level: 4 },
          { name: 'Git', category: 'tooling', level: 5 },
          { name: 'Claude Code', category: 'tooling', level: 4 },
        ],
      },
      projects: {
        create: [
          {
            title: 'Эта визитка',
            description:
              'Данная цифровая визитка: NestJS + GraphQL API поверх Prisma, отдаёт данные для карточки-портфолио; контейнеризовано через Docker.',
            stack: 'TypeScript, NestJS, GraphQL, Prisma, Docker, Git, Claude Code',
            repoUrl: 'http://localhost:3000/',
            demoUrl: 'https://github.com/Konstantinbadto/bisness-card',
          },
          {
            title: 'Сайт для hr компании ',
            description:
              'REST/GraphQL-бэкенд для e-commerce платформы: очереди, платёжный шлюз, ролевой доступ.',
            stack: 'PHP, Vue.js, HTML5/CSS3, MYSQL, Git',
            repoUrl: '',
            demoUrl: null,
          },
        ],
      },
      experience: {
        create: [
          {
            period: '2025 — 2026.',
            title: 'Fullstack-разработчик',
            description: 'Разработка мобильных приложений (Android) и веб-сервисов по заказу частных клиентов. Проектирование клиент-серверной архитектуры, интеграция REST API.Внедрение и настройка модулей на базе нейросетей / машинного обучения. Стек: Android (Kotlin ), JavaScript, Node.js, Python ML, Git, MYSQL, PostgreSQL',
          },
          {
            period: '2024 — 2025',
            title: 'Fullstack-разработчик',
            description: 'Разработка и поддержка корпоративного веб-сайта компании. Проектирование и обслуживание серверной части приложения (backend), оптимизация баз данных. Рефакторинг и оптимизация производительности существующего кода. Участие в проектировании UI/UX и разработка элементов фирменного стиля (включая логотип).Стек: PHP, Vue.js, HTML5/CSS3, MYSQL, Git',
          },
        ],
      },
    },
  });

  console.log(' Данные визитки загружены (prisma/seed.ts)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
