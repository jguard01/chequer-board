import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { PostEntity } from '../post.entity';

export class PostUpdateDto extends AbstractDto {

  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  description: string;

  constructor(post: PostEntity) {
    super(post);
    this.title = post.title;
    this.description = post.description;
  }
}
