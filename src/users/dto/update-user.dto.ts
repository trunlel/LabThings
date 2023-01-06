import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Match } from 'src/core/decorators/match-decorator';

export class changePasswordDto {
  @IsString()
  @MaxLength(30)
  @IsEmail(undefined, { message: 'O e-mail informado não é válido' })
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly old_password: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsString()
  @Match('password', {
    message: 'Senhas não são iguais',
  })
  readonly confirm_password: string;
}
