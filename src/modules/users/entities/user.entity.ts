import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../common/enums/rol.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  fullname: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role, nullable:false })
  role: Role;

  @Column({nullable: false})
  creditPoints: number;

  @Column({nullable:false})
  address: string;

  @Column({nullable:false})
  phone: string;

  @Column({nullable:false})
  createdAt: Date;

  @Column({nullable:false})
  isActive: boolean;
}
