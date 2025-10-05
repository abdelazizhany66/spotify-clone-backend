import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist-entity';
import { Song } from '../songs/song-entity'; 
import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from '../users/users-entity';
import { CreatePlayListDto } from './dto/create-playlist-dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PlayListsService {
  constructor(
    @InjectRepository(Playlist)
    private playListRepo: Repository<Playlist>,

    @InjectRepository(Song)
    private songsRepo: Repository<Song>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
     private readonly redisService: RedisService
  ) {}

 async create(playListDTO: CreatePlayListDto): Promise<Playlist> {
    const playList = this.playListRepo.create(playListDTO);
    
    const songs = await this.songsRepo.findBy({ id: In(playListDTO.songs) });
    playList.songs = songs;

    const user = await this.userRepo.findOneBy({ id: playListDTO.user });
    if (!user) throw new NotFoundException('User not found');
    playList.user = user;
    
    await this.playListRepo.save(playList);

    await this.redisService.setUserPlaylist(user.id, playList);

    return playList;
  }

async get(userId: number) {
  
  const dbPlaylist = await this.playListRepo.findOne({
    where: { user: { id: userId } },
    relations: ['songs', 'user']
  });

  if (!dbPlaylist) throw new NotFoundException('No playlist for you');

  await this.redisService.setUserPlaylist(userId, dbPlaylist);

  return dbPlaylist;
}

  async addSongToPlaylist(userId: number, songId: number) {
    const song = await this.songsRepo.findOneBy({ id: songId });
    if (!song) throw new NotFoundException('Song not found');
    
    await this.redisService.addSongToPlaylist(userId, songId);
    
    const playlist = await this.playListRepo.findOne({
      where: { user: { id: userId } },
      relations: ['songs']
    });
    
    if (playlist && !playlist.songs.some(s => s.id === songId)) {
      playlist.songs.push(song);
      await this.playListRepo.save(playlist);
    }
  }

  async removeSongFromPlaylist(userId: number, songId: number) {

    await this.redisService.removeSongFromPlaylist(userId, songId);
    
    const playlist = await this.playListRepo.findOne({
      where: { user: { id: userId } },
      relations: ['songs']
    });
    
    if (playlist) {
      playlist.songs = playlist.songs.filter(song => song.id !== songId);
      await this.playListRepo.save(playlist);
    }
  }
}
