import { IsArray, IsDateString, IsMilitaryTime, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSongDTO{
  @IsString()
  @IsOptional()
  readonly title:string

  
  @IsArray()
  @IsNumber({},{each:true})
  @IsOptional()
  readonly artists;

  @IsDateString()
  @IsOptional()
  readonly releasedDate:Date;

  @IsMilitaryTime()
  @IsOptional()
  readonly duration:Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}