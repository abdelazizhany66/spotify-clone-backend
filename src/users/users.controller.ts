import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiTags('User')
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor( private usersService: UsersService){}
  @Post('/upload-avatar/:id')
  //swagger

  @ApiConsumes('multipart/form-data') 
  @ApiBody({
  description: 'Upload user avatar',
  required: true,
  schema: {
    type: 'object',
    properties: {
      avatar: {
        type: 'string',
        format: 'binary',
      },
    },
  },
})

  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './upload/files',
        filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName)
        },
      }),

      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadAvatar(
  @UploadedFile() file: Express.Multer.File,
  @Param('id') userId: number,
) {
  console.log(file);

  const user = await this.usersService.findById(userId);
  if(!user){
    throw new NotFoundException()
  }
  user.avatar = file.filename;

  return { message: 'Avatar uploaded successfully!', avatar: user.avatar };
}

  @Get('profile')
  @ApiOperation({ summary: 'get current user profile' })
  @ApiResponse({
      status: 200,
      description: 'return user information',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() request){
    return request.user
  }

}
