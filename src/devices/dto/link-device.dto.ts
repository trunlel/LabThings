import { IsString } from 'class-validator';
import { RoomEnum } from '../enum/room-device.enum';
import { LocalEnum } from '../enum/local-device.enum';

export class localDeviceDto {

  @IsString()
  readonly local: LocalEnum;

  @IsString()
  readonly room: RoomEnum;
}
