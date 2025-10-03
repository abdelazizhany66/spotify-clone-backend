import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayListDto {
  @ApiProperty({
      description: 'enter playlist name',
  })
  @IsString()
  @IsNotEmpty()
  readonly name;

  @ApiProperty({
    example: '[1,2,3]',
    description: 'provide songs you liked',
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs;

  @IsNumber()
  @IsNotEmpty()
  readonly user;
}