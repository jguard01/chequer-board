import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { PostEntity } from '../post.entity';

export class PostCreateDto extends AbstractDto {

  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  createBy: string;

  @ApiPropertyOptional()
  description: string;

  constructor(post: PostEntity) {
    super(post);
    this.title = post.title;
    this.createBy = post.createBy;
    this.description = post.description;
  }
}
