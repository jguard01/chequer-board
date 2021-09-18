import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { PostDto } from './dto/PostDto';

@Entity({ name: 'posts' })
export class PostEntity extends AbstractEntity<PostDto> {
  @Column()
  postId: number;

  @Column()
  title: string;

  @Column({ nullable: false })
  createBy: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  views: number;

  @Column({ nullable: false })
  deleted: boolean;

  @Column({ nullable: false })
  phone: string;

  dtoClass = PostDto;
}
