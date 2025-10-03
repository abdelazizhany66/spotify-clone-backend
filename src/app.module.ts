import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppDataSource } from 'migration/data-source';
import { PlaylistModule } from './playlist/playlist.module';
import { ArtistsModule } from './artists/artists.module';
import { ConfigModule } from '@nestjs/config';
// import { validate } from 'env.validation';
import * as dotenv from 'dotenv';
import { RedisModule } from './redis/redis.module';

dotenv.config()


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      // validate:validate
    }),
    TypeOrmModule.forRoot({...AppDataSource.options}),
    SongsModule,
    PlaylistModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    RedisModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs')
  }
}
