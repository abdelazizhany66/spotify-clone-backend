import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsMilitaryTime, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSongDTO{
  @ApiProperty({
      description: 'provide songs title ',
  })
  @IsString()
  @IsOptional()
  readonly title:string

  
  @IsArray()
  @IsNumber({},{each:true})
  @IsOptional()
  readonly artists;

   @ApiProperty({
    example: '2025-2-23',
    description: 'provide date',
  })
  @IsDateString()
  @IsOptional()
  readonly releasedDate:Date;

  @ApiProperty({
    example: '[2:12]',
    description: 'provide time',
  })
  @IsMilitaryTime()
  @IsOptional()
  readonly duration:Date;

  @ApiProperty({
    description: 'provide lyrics',
  })
  @IsString()
  @IsOptional()
  readonly lyrics: string;
}