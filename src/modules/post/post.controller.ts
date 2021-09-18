import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PostDto } from './dto/PostDto';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
// import { AuthService } from './auth.service';
// import { LoginPayloadDto } from './dto/LoginPayloadDto';
// import { UserLoginDto } from './dto/UserLoginDto';
import { PostCreateDto } from './dto/PostCreate.dto';


@Controller('posts')
@ApiTags('post')
export class PostController {
    constructor(
      public readonly postService: PostService,
    ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PostDto, description: 'Successfully Created' })
  async userRegister(
    @Body() postCreateDto: PostCreateDto,
  ): Promise<PostDto> {
    const createdPost = await this.postService.createPost(postCreateDto);

    return createdPost.toDto<typeof PostDto>();
  }
}
