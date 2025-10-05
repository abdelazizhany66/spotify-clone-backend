import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlayListDto } from './dto/create-playlist-dto';
import { PlayListsService } from './playlist.service';
import { JwtAuthGuard } from '../auth/jwt-guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/users-entity';
import { UserDto } from '../auth/dto/user-dto';
import { serialize } from '../interseptors/serialize.interceptor';

@Controller('playlists')
@ApiTags('playlist')
@ApiBearerAuth('JWT-auth')
@serialize(UserDto)
export class PlayListsController {
  constructor(
    
    private readonly playListService: PlayListsService
    
  ) {}
  
  
  @Post()
  @ApiOperation({ summary: 'Create Playlist' })
  @ApiResponse({ status: 201 })
  @UseGuards(JwtAuthGuard)
  @serialize(UserDto)
  create(@Body() playlistDTO: CreatePlayListDto) {
    return this.playListService.create(playlistDTO);
  }


  @Get('my-playlist')
  @ApiOperation({ summary: 'Get Playlist' })
  @ApiResponse({
    status: 200,
    description: 'It will return songs and playlist name in the response'
  })
  @UseGuards(JwtAuthGuard)
  async getPlaylist(@CurrentUser() user: User) {
    const playlist = await this.playListService.get(user.id);
    return { success: true, data: playlist };
  }

  @Post('add-song/:songId')
  @ApiOperation({ summary: 'Add song to playlist' })
  @UseGuards(JwtAuthGuard)
  async addSong(@CurrentUser() user: User, @Param('songId') songId: number) {
    await this.playListService.addSongToPlaylist(user.id, songId);
    return { success: true, message: 'Song added to playlist' };
  }

  @Delete('remove-song/:songId')
  @ApiOperation({ summary: 'Remove song from playlist' })
  @UseGuards(JwtAuthGuard)
  async removeSong(@CurrentUser() user: User, @Param('songId') songId: number) {
    await this.playListService.removeSongFromPlaylist(user.id, songId);
    return { success: true, message: 'Song removed from playlist' };
  }


}