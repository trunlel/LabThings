import { IsString } from 'class-validator';

export class localDeviceDto {
  @IsString()
  readonly local: string;

  @IsString()
  readonly room: string;
}
