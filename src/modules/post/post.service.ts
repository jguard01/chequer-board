import { Injectable } from '@nestjs/common';
import type { FindConditions } from 'typeorm';

import type { PageDto } from '../../common/dto/page.dto';
import type { PostDto } from './dto/PostDto';
import type { PostUpdateDto } from './dto/PostUpdate.dto';
import { PostCreateDto } from './dto/PostCreate.dto';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserDto } from '../../modules/user/dto/user-dto';
import { UserEntity } from '../../modules/user/user.entity';

@Injectable()
export class PostService {
    constructor(
        public readonly PostRepository: PostRepository,
    ) { }

    async createPost(
        PostCreateDto: PostCreateDto,
        user: UserDto
    ): Promise<PostEntity> {
        const post = this.PostRepository.create(PostCreateDto);
        post.createdBy = user.id;

        return this.PostRepository.save(post);
    }


    async getPost(
        id: number,
        user: UserEntity
    ): Promise<PostEntity> {
        const post = await this.PostRepository.findOne(id, {
            relations: ['user'],
        });
        if (post.user.id !== user.id) {
            await this.PostRepository.update(id, {
                views: ++post.views,
            });
        }
        return post;
    }

}
