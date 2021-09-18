import { Injectable } from '@nestjs/common';
import type { FindConditions } from 'typeorm';

import type { PageDto } from '../../common/dto/page.dto';
import type { PostDto } from './dto/PostDto';
import type { PostUpdateDto } from './dto/PostUpdate.dto';
import { PostCreateDto } from './dto/PostCreate.dto';
import type { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    public readonly PostRepository: PostRepository,
  ) {}

  async createPost(
    PostCreateDto: PostCreateDto,
  ): Promise<PostEntity> {
    const user = this.PostRepository.create(PostCreateDto);
    return this.PostRepository.save(user);
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
