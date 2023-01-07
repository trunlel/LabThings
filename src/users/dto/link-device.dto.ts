import { IsString } from 'class-validator';
import { RoomEnum } from '../enum/room-device.enum';
import { LocalEnum } from '../enum/local-device.enum';

export class linkDeviceDto {
  @IsString()
  readonly local: LocalEnum;

  @IsString()
  readonly room: RoomEnum;
}
