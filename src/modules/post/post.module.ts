import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PostRepository])],
    controllers: [PostController],
    exports: [PostService],
    providers: [PostService],
  })
  export class PostModule {}
