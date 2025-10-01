import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO{
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'provide the email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email:string

  @ApiProperty({
      description: 'provide the password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password:string
}