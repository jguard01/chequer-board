import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { PostEntity } from '../post.entity';

export class PostCreateDto extends AbstractDto {
  @ApiPropertyOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  description: string;

//   constructor(post: PostEntity) {
//     console.log("PostCreatedEntity=",post);
//     super(post);
//     this.title = post.title;
//     this.description = post.description;
//     this.createdAt = post.createdAt;
//   }
}
