import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist-entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateArtistDto } from './dto/create-artist-dto';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly usersService:UsersService,
    @InjectRepository(Artist) private ArtistRepo:Repository<Artist>
  ){}

  findArtist(userId:number){
    return this.ArtistRepo.findOneBy({user:{id:userId}})
  }


  async upgradeToArtist(userId: number, artistData: CreateArtistDto) {
  const user = await this.usersService.findById( userId );
  if (!user) {
    throw new NotFoundException('User not found');
  }


  const artist = this.ArtistRepo.create({
    ...artistData,
    user,
  });

  return this.ArtistRepo.save(artist);
}
}
