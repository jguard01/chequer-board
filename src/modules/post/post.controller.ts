import {
    Body,
    Controller,
    Get,
    Patch,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,

} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PostDto } from './dto/PostDto';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
// import { AuthService } from './auth.service';
// import { LoginPayloadDto } from './dto/LoginPayloadDto';
// import { UserLoginDto } from './dto/UserLoginDto';
import { PostCreateDto } from './dto/PostCreate.dto';
import { PostListDto } from './dto/PostListPayload.dto';
import { UserDto } from '../../modules/user/dto/user-dto';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserEntity } from '../../modules/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { CurrentUser } from '../../modules/common/decorator/current-user.decorator';
import { PageDto } from '../../common/dto/page.dto';
import { PostsPageOptionDto } from './dto/posts-page-options.dto'
import { PostUpdateDto } from './dto/PostUpdate.dto';
import { PostDeleteDto } from './dto/PostDelete.dto';
import { PrimaryGeneratedColumn } from 'typeorm';

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
    async postDelete(
        @Body() postCreateDto: PostCreateDto,
        @CurrentUser() user: UserEntity
    ): Promise<PostDto> {
        const createdPost = await this.postService.createPost(postCreateDto, user);
        return createdPost.toDto<typeof PostDto>();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Post('update')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: PostDto, description: 'Successfully Created' })
    async postUpdate(
        @CurrentUser() user: UserEntity,
        @Body() postUpdateDto: PostUpdateDto
    ): Promise<boolean> {
        const updatedPost = await this.postService.updatePost(user, postUpdateDto);
        if (updatedPost !== undefined) {
            return true;
        }
        else {
            return false;
        }

    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Post('delete')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: PostDto, description: 'Successfully Created' })
    async postCreate(
        @Body() postDeleteDto: PostDeleteDto,
        @CurrentUser() user: UserEntity,
    ): Promise<boolean> {
        const deletePost = await this.postService.deletePost(postDeleteDto, user);
        if (deletePost !== undefined) {
            return true;
        }
        else {
            return false;
        }
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

    @Get('list')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ type: PageDto, description: 'Successfully' })
    async PostLists(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: PostsPageOptionDto,
        @Query('page') PageNum: number,
    ): Promise<PageDto<PostListDto>> {
        console.log("Page = ", PageNum);
        return await this.postService.getPostList(pageOptionsDto);
    }
}
