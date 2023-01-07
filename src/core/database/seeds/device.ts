import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
