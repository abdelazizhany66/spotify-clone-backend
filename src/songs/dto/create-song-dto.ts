import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSongDTO{
  @ApiProperty({
      description: 'provide song title',
  })
  @IsString()
  @IsNotEmpty()
  readonly title:string

  @ApiProperty({
    example: '[1,2]',
    description: 'provide artists songs',
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({},{each:true})
  readonly artists;

   @ApiProperty({
    example: '[2025-2-22',
    description: 'provide date',
  })
  @IsNotEmpty()
  @IsDateString()
  readonly releasedDate:Date;

   @ApiProperty({
    example: '[2:45]',
    description: 'provide time',
  })
  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration:Date;

   @ApiProperty({
    description: 'provide lyrics songs',
  })
  @IsString()
  @IsOptional()
  readonly lyrics: string;
}