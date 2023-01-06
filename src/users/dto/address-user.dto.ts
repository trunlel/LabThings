import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class AddressDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/[0-9]{5}-[0-9]{3}/, {
    message: 'Cep invalido',
  })
  readonly zipCode: string;

  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsNumber()
  @IsNotEmpty()
  readonly number: number;

  @IsString()
  @IsNotEmpty()
  readonly neighborhood: string;

  @IsNotEmpty()
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  readonly complement?: string;
}
