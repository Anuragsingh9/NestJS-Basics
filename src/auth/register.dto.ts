import { IsEmail, isNotEmpty, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

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

  roles: string[];

}