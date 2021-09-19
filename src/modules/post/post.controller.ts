import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
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
import { AuthGuard } from '@nestjs/passport';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { CurrentUser } from '../../modules/common/decorator/current-user.decorator';

@Controller('post')
@ApiTags('post')
export class PostController {
    constructor(
        public readonly postService: PostService,
    ) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Post('create')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: PostDto, description: 'Successfully Created' })
    async postCreate(
        @Body() postCreateDto: PostCreateDto,
        @CurrentUser() user: UserEntity
    ): Promise<PostDto> {
        const createdPost = await this.postService.createPost(postCreateDto, user);

        return createdPost.toDto<typeof PostDto>();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Get('detail/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: PostDto, description: 'Successfully' })
    async postGet(
        @Param('id') id: number,
        @CurrentUser() user: UserEntity
    ): Promise<PostDto> {
        const createdPost = await this.postService.getPost(id, user);

        return createdPost.toDto<typeof PostDto>();
    }
}
