import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist-dto';
import { ArtistsService } from './artists.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { User } from 'src/users/users-entity';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('artists')
export class ArtistsController {
constructor(private readonly artistsService:ArtistsService){}

@Post('convert-to-artist')
 @ApiOperation({ summary: 'convert normal user to artist user' })
@ApiResponse({
    status: 200,
    description: 'return artist user',
})
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
async convertArtist(@CurrentUser() user: User, @Body() artistData: CreateArtistDto) {
  return this.artistsService.upgradeToArtist(user.id, artistData);
}

}
