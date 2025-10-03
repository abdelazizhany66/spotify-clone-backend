import {  Injectable, NotFoundException, Scope, UnauthorizedException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Song } from './song-entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../artists/artist-entity';
import { RedisService } from '../redis/redis.service';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongsService {
  constructor(
    @InjectRepository(Song) private songRepo:Repository<Song>,
    @InjectRepository(Artist) private artistRepo: Repository<Artist>,
    private readonly redisService : RedisService
  ){}

  async create(userId:number ,createSongDTO:CreateSongDTO){
    const user = await this.artistRepo.findOne({where:{id:userId}})
     if(!user){
      throw new UnauthorizedException("you don't have premission to create songe artist only create ")
    }
    const song = this.songRepo.create(createSongDTO)
    //search in artists repostry and save valus in song.artist+
    const artist = await this.artistRepo.findBy({id: In(createSongDTO.artists)})
    song.artists = artist
    return this.songRepo.save(song)
  }

  async findAll(){
   const songs = await this.songRepo.find()
   if(!songs){
    throw new NotFoundException('not found songs')
   }
   return songs;
  }

  async findOne(id:number){
   const song = await this.songRepo.findOneBy({id})
    if(!song){
      throw new NotFoundException('song is not found')
    }
    return song;
  }

  async update(id:number , attrs:Partial<Song>){
    const song = await this.findOne(id)
    if(!song){
      throw new NotFoundException('not found song')
    }
    Object.assign(song,attrs)
    return this.songRepo.save(song)
  }

  async remove(id:number){
    const song = await this.findOne(id)
    if(!song){
      throw new NotFoundException('not found song')
    }
    return this.songRepo.remove(song)
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = await this.songRepo.createQueryBuilder('c')
     queryBuilder.orderBy('c.releasedDate','DESC')
  return paginate<Song>(queryBuilder, options);
  }

  async addScore(songId:number){
    await this.redisService.incrementSongPlayCount(songId);
    return { success: true, message: 'Song play count updated' };
  } 
  
  async topSongs(limit:number){

    return await this.redisService.getTopSongs(Number(limit));
    
  }

  async getRank(songId:number){
    const rank = await this.redisService.getSongRank(songId);
    return { success: true, data: { songId, rank } };
  }

}
