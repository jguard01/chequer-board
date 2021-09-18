<<<<<<< HEAD
import { Column, Entity } from 'typeorm';
=======
import { Column, Entity,PrimaryGeneratedColumn } from 'typeorm';
>>>>>>> login and register without timestamp

import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { VirtualColumn } from '../../decorators/virtual-column.decorator';
import { UserDto } from './dto/user-dto';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
  @Column()
  userId: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  fullname: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phone: string;
  dtoClass = UserDto;
}
