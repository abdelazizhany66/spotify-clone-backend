import { Body, Controller, DefaultValuePipe, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query, Scope, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service'
import { CreateSongDTO } from './dto/create-song-dto';
import type { Connection } from '../common/constatnts/connection';
import { UpdateSongDTO } from './dto/update-song-dto';
import { JwtAuthGuard } from '../auth/jwt-guard';

@Controller({path:'songs', scope: Scope.REQUEST})
export class SongsController {
  constructor(
    private SongsService:SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ){
    console.log(`THIS IS CONNECTION STRING ${this.connection.CONNECTION_STRING}`)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() CreateSongDTO:CreateSongDTO){
    return this.SongsService.create(CreateSongDTO)
  }

  @Get()
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
  findOne(@Param('id') id:string){
    return this.SongsService.findOne(parseInt(id))
  }

  @Patch('/:id')
  update(@Param('id') id:string, @Body() body : UpdateSongDTO ){
    return this.SongsService.update(parseInt(id),body)
  }

  @Delete('/:id')
  delete(@Param('id') id:string){
    return this.SongsService.remove(parseInt(id))
  }
}
