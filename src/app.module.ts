import { join } from 'path';
import { tmpdir } from 'os';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // На Vercel файловая система доступна на запись только в /tmp —
      // поэтому генерируемую схему пишем туда, а не в исходники проекта.
      autoSchemaFile: join(tmpdir(), 'schema.gql'),
      sortSchema: true,
      playground: true,
      path: '/graphql',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      exclude: ['/graphql', '/graphql/(.*)'],
    }),
    ProfileModule,
  ],
})
export class AppModule {}
