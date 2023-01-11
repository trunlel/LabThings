import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Match } from 'src/core/decorators/match-decorator';
import { AddressDTO } from './address-user.dto';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  readonly name: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  readonly photoUrl: string;

  @IsString()
  @MaxLength(30)
  @IsEmail(undefined, { message: 'O e-mail informado não é válido' })
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsString()
  @Match('password', {
    message: 'Senhas não são iguais',
  })
  readonly confirm_password: string;

  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDTO)
  readonly address: AddressDTO;
}
