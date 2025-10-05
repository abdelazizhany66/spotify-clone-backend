import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    description: 'provide your stage name',
  })
  @IsString()
  stageName: string;   

  @ApiProperty({
   description: 'if you woant add bio',
  })
  @IsOptional()
  @IsString()
  bio?: string;    

}
