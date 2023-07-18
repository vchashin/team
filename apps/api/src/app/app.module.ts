import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigNamespaces, GRAPHQL_CONFIG } from './configuration/app.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { PrismaClient, PrismaModule, PrismaService } from '@tm/prisma';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ResolversModule } from './resolvers.module';

interface Context {
  prisma: PrismaClient;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [GRAPHQL_CONFIG],
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (config: ConfigService, prisma: PrismaService) => ({
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        autoSchemaFile: config.get(ConfigNamespaces.graphql).autoSchemaFile,
        context: (): Context => ({ prisma }),
      }),
      inject: [ConfigService, PrismaService],
    }),
    PrismaModule,
    ResolversModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
