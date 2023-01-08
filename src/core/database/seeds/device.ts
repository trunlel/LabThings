import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'devices' })
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  madeBy: string;

  @Column()
  active: boolean;

  @Column()
  info: string;

  @Column()
  photoUrl: string;

  @Column()
  ip_address: string;

  @Column()
  mac_address: string;

  // @ManyToOne(() => UserEntity, (user: UserEntity) => user.devices, {
  //   onDelete: 'SET NULL',
  // })
  // @JoinColumn({ name: 'user_id' }) // opcional para OneToMany
  // user: UserEntity;
}
