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
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './users-entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiTags('User')
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor( private usersService: UsersService){}
  @Post('/upload-avatar')
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
  @CurrentUser() user: User,
) {

  const currentuser = await this.usersService.findById(user.id);
  if(!currentuser){
    throw new NotFoundException()
  }
  currentuser.avatar = file.filename;

  return { message: 'Avatar uploaded successfully!', avatar: currentuser.avatar };
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
