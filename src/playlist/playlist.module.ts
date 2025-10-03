import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayListsController } from './playlist.controller';
import { PlayListsService } from './playlist.service';
import { Playlist } from './playlist-entity';
import { Song } from 'src/songs/song-entity';
import { User } from 'src/users/users-entity';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User]),RedisModule],
  controllers: [PlayListsController],
  providers: [PlayListsService]
})
export class PlaylistModule {}
