import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LocalEnum } from '../enum/local-device.enum';
import { RoomEnum } from '../enum/room-device.enum';

// "userId está seguindo followingId"
@Entity({ name: 'linked' })
export class LinkedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // id do usuário

  @Column()
  deviceId: number; // id de quem está seguindo

  @Column()
  local: LocalEnum;

  @Column()
  room: RoomEnum;

  @CreateDateColumn()
  createdAt: Date;
}
