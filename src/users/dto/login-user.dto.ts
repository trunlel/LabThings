import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class authDto {
  @IsString()
  @MaxLength(30)
  @IsEmail(undefined, { message: 'O e-mail informado não é válido' })
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}
