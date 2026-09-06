import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // Генерируем схему прямо в память — без завязки на /tmp или файловую систему
      autoSchemaFile: true,
      sortSchema: true,
      // Явно разрешаем Playground и Интроспекцию для продакшена (Railway)
      playground: true,
      introspection: true,
      path: '/graphql',
    }),
    ServeStaticModule.forRoot({
      // Используем process.cwd() для корректной привязки к рабочей директории Docker (/app/public)
      rootPath: join(process.cwd(), 'public'),
      exclude: ['/graphql/(.*)'],
      serveStaticOptions: {
        fallthrough: true, // Защищает от выпадания сервера, если какого-то статического файла нет
      },
    }),
    ProfileModule,
  ],
})
export class AppModule {}
