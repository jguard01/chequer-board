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

@Injectable()
export class PostService {
    constructor(
        public readonly PostRepository: PostRepository,
    ) { }

    async createPost(
        PostCreateDto: PostCreateDto,
        user: UserDto
    ): Promise<PostEntity> {
        console.log("createPost=", PostEntity)
        const post = this.PostRepository.create(PostCreateDto);
        post.createdBy = user.id;
        console.log(">>>>>>>>>>", user);
        return this.PostRepository.save(post);
    }


    //   async getUsers(
    //     pageOptionsDto: UsersPageOptionsDto,
    //   ): Promise<PageDto<UserDto>> {
    //     const queryBuilder = this.userRepository.createQueryBuilder('user');
    //     const { items, pageMetaDto } = await queryBuilder.paginate(pageOptionsDto);

    //     return items.toPageDto(pageMetaDto);
    //   }

    //   async getUser(userId: string): Promise<PostEntity> {
    //     const queryBuilder = this.userRepository.createQueryBuilder('user');

    //     queryBuilder.where('user.id = :userId', { userId });

    //     const userEntity = await queryBuilder.getOne();

    //     return userEntity.toDto();
    //   }

    /**
     * Find single user
     */
    //   findOne(findData: FindConditions<PostEntity>): Promise<PostEntity> {
    //     return this.userRepository.findOne(findData);
    //   }
    //   async findByUsernameOrId(
    //     options: Partial<{ username: string; userId: string }>,
    //   ): Promise<PostEntity | undefined> {
    //     const queryBuilder = this.userRepository.createQueryBuilder('user');

    //     if (options.userId) {
    //       queryBuilder.orWhere('user.userId = :userId', {
    //         userId: options.userId,
    //       });
    //     }
    //     if (options.username) {
    //       queryBuilder.orWhere('user.username = :username', {
    //         username: options.username,
    //       });
    //     }

    //     return queryBuilder.getOne();
    //   }


}
