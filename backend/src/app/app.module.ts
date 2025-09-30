// app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        host: configService.get<string>('DATABASE_HOST'),

        port: configService.get<number>('DATABASE_PORT'),

        username: configService.get<string>('DATABASE_USERNAME'),
        database: configService.get<string>('DATABASE_DATABASE'),
        password: configService.get<string>('DATABASE_PASSWORD'),

        autoLoadEntities:
          configService.get<string>('DATABASE_AUTOLOADENTITIES') === 'true',
        synchronize:
          configService.get<string>('DATABASE_SYNCHRONIZE') === 'true',
      }),
    }),

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
