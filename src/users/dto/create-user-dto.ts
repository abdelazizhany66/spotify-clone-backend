import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {

  @ApiProperty({
      example:'Your first Name',
      description: 'provide the firstName of the user'
    })
  @IsString()
  @IsNotEmpty()
  firstName:string

  @ApiProperty({
    example: 'Your Last Name',
    description: 'provide the lastName of the user',
  })
  @IsString()
  @IsNotEmpty()  
  lastName:string

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'provide the email of the user',
  })
  @IsString()
  @IsNotEmpty()
  email:string 
  
  @ApiProperty({
    description: 'provide the password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password:string  
}