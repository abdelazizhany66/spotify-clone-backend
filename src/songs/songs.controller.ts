import { Body, Controller, DefaultValuePipe, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query, Scope, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service'
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';
import { JwtAuthGuard } from '../auth/jwt-guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/users-entity';

@Controller('songs')
@ApiTags('songs')
@ApiBearerAuth('JWT-auth')
export class SongsController {
  constructor(
    private SongsService:SongsService,
  
    ){}

  @Post()
  @ApiOperation({ summary: 'artist only create song '})
    @ApiResponse({
      status: 201,
      description: 'it will return new song the response'
    })
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user : User ,@Body() CreateSongDTO:CreateSongDTO){
    return this.SongsService.create(user.id,CreateSongDTO)
  }

  @Get()
  @ApiOperation({ summary: 'get all songs when add page and limit ' })
  @ApiResponse({
    status: 200,
    description: 'will be return songs',
  })
  findAll(
    @Query('page', new DefaultValuePipe(1),ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10),ParseIntPipe) limit=10
   ){
    limit = limit>100? 100 : limit;
    return this.SongsService.paginate({
      page,
      limit
    })
  }

  @Get('/:id')
  @ApiOperation({ summary: 'get song by specific id' })
  @ApiResponse({
    status: 200,
    description: 'give you it song',
  })
  findOne(@Param('id') id:string){
    return this.SongsService.findOne(parseInt(id))
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'update song content' })
  @ApiResponse({
    status: 200,
    description: 'give you it song',
  })
  update(@Param('id') id:string, @Body() body : UpdateSongDTO ){
    return this.SongsService.update(parseInt(id),body)
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'delete song by specific id' })
  @ApiResponse({
    status: 200,
    description: 'delete it song',
  })
  delete(@Param('id') id:string){
    return this.SongsService.remove(parseInt(id))
  }

  @Post(':id/play')
  @ApiOperation({ summary: 'add a score to song' })
  @ApiResponse({
    status: 200,
    description: 'add a score if someone watches the song',
  })
   playSong(@Param('id') songId: number) {
    return this.SongsService.addScore(songId)
  }

  @Get('top/:limit')
  @ApiOperation({ summary: 'if you want limit {start,stop} score ' })
  @ApiResponse({
    status: 200,
    description: 'return to yoou the limit you wrote',
  })
  async getTopSongs(@Param('limit') limit: number) {
    return this.SongsService.topSongs(limit)
  }

  @Get(':id/rank')
   @ApiOperation({ summary: 'add member you want know rank' })
  @ApiResponse({
    status: 200,
    description: 'will be return song rank',
  })
  async getSongRank(@Param('id') songId: number) {
    return this.SongsService.getRank(songId)
  }

}
