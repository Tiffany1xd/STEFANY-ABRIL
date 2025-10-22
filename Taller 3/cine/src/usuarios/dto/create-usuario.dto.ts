import { IsEmail, IsString, MinLength, IsOptional, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre: string;

  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @MaxLength(100)
  correo: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(50)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  telefono?: string;

  @IsOptional()
  @IsString()
  rol?: string;
}