import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString()
  @MinLength(4, { message: 'A senha deve ter no mínimo 4 caracteres' })
  password: string;

  @IsOptional()
  @IsInt({ message: 'profileId deve ser um número inteiro' })
  profileId?: number;
}
