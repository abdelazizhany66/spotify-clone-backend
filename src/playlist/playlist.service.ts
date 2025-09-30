import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist-entity';
import { Song } from '../songs/song-entity'; 
import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from '../users/users-entity';
import { CreatePlayListDto } from './dto/create-playlist-dto';

@Injectable()
export class PlayListsService {
  constructor(
    @InjectRepository(Playlist)
    private playListRepo: Repository<Playlist>,

    @InjectRepository(Song)
    private songsRepo: Repository<Song>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(playListDTO: CreatePlayListDto): Promise<Playlist> {
    const playList = this.playListRepo.create(playListDTO)

    const songs = await this.songsRepo.findBy({id: In(playListDTO.songs),}) //findByIds(playListDTO.songs);
    playList.songs = songs;

    const user = await this.userRepo.findOneBy({ id: playListDTO.user });
    if(!user){
      throw new NotFoundException('not found user')
    }
    playList.user = user;

    return this.playListRepo.save(playList);
  }
}