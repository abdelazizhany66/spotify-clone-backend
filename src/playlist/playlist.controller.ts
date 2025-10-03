import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlayListDto } from './dto/create-playlist-dto';
import { PlayListsService } from './playlist.service';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('playlists')
@ApiTags('playlist')
@ApiBearerAuth('JWT-auth')
export class PlayListsController {
  constructor(
    private readonly playListService: PlayListsService,

  ) {}
  @Post()
  @ApiOperation({ summary: 'Create Playlist '})
    @ApiResponse({
      status: 201,
    })
  create(
    @Body()
    playlistDTO: CreatePlayListDto,
  ) {
    return this.playListService.create(playlistDTO);
  }



  @UseGuards(JwtAuthGuard)
  @Get('my-playlist')
  @ApiOperation({ summary: 'get Playlist'})
  @ApiResponse({
    status: 201,
    description: 'it will return songs and playlist name in the response'
  })
  async getPlaylist(@CurrentUser() user: any) {
    const playlist = await this.playListService.get(user.id);
    return { success: true, data: playlist };
  }
}