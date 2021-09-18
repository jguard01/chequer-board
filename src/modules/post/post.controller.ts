import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
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
import { UserDto } from '../../modules/user/dto/user-dto';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserEntity } from '../../modules/user/user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';

@Controller('posts')
@ApiTags('post')
export class PostController {
    constructor(
        public readonly postService: PostService,
    ) { }

    @Post('create')
    @UseGuards(AuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    // @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: PostDto, description: 'Successfully Created' })
    async postCreate(
        @Body() postCreateDto: PostCreateDto,
        @AuthUser() user: UserEntity
    ): Promise<PostDto> {
        console.log("postcontroller's dto=", postCreateDto);
        const createdPost = await this.postService.createPost(postCreateDto, user);
        return createdPost.toDto<typeof PostDto>();
    }
}
