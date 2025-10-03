import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song-entity';
import { Artist } from '../artists/artist-entity';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports:[TypeOrmModule.forFeature([Song, Artist]),RedisModule],
  controllers: [SongsController],
  providers: [
    SongsService,
  ]
})
export class SongsModule {}
