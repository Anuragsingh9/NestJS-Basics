import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, isNotEmpty, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Role } from '../../src/constants/roles.enum';

export class CreateUserDto {

  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  name: string;

  @IsEmail()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(500)
  @MinLength(3)
  password: string;

  isActive: boolean;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, { each: true, message: 'Invalid role given' }) // Ensures each value in the array is a valid UserRole
  roles: Role[];

}