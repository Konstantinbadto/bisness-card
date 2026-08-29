Добавь новый навык в визитку по названию, которое я укажу дальше в сообщении.

Шаги:
1. Добавь запись в `prisma/seed.ts` в блок `skills.create` с полями
   `name`, `category` (`language|framework|database|devops|tooling`), `level` (1-5).
2. Если нужно — обнови `README.md` в разделе "Технологии".
3. Прогони `npm run prisma:seed`, чтобы проверить, что данные применяются без ошибок.
4. Ничего не меняй в `src/profile/models/profile.model.ts` — модель Skill уже универсальна.
