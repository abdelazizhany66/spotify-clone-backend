import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { DevConfigService } from './common/providers/DevConfigService';
import { Song } from './songs/song.entity';
import { User } from './users/users-entity';
import { Artist } from './artists/artist-entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      database:'spotify-clone',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'1102000',
      entities:[Song, User, Artist],
      synchronize:true
    }),
    SongsModule,
    AuthModule,
    UsersModule,
    ArtistsModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide:DevConfigService,
      useClass:DevConfigService
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs')
  }
}
