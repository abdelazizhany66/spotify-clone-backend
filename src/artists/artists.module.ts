import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { Artist } from './artist-entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Artist]),UsersModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports:[ArtistsService]
})
export class ArtistsModule {}
