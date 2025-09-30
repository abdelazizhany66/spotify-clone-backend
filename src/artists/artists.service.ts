import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist-entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(@InjectRepository(Artist) private ArtistRepo:Repository<Artist>){}

  findArtist(userId:number){
    return this.ArtistRepo.findOneBy({user:{id:userId}})
  }
}
