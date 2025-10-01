import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePlayListDto } from './dto/create-playlist-dto';
import { PlayListsService } from './playlist.service';

@Controller('playlists')
@ApiTags('playlist')
@ApiBearerAuth('JWT-auth')
export class PlayListsController {
  constructor(private playListService: PlayListsService) {}
  @Post()
  create(
    @Body()
    playlistDTO: CreatePlayListDto,
  ) {
    return this.playListService.create(playlistDTO);
  }
}