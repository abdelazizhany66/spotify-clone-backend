import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistController } from './playlist.controller';
import { PlayListsService } from './playlist.service';
import { Playlist } from './playlist-entity';
import { Song } from 'src/songs/song-entity';
import { User } from 'src/users/users-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  controllers: [PlaylistController],
  providers: [PlayListsService]
})
export class PlaylistModule {}
