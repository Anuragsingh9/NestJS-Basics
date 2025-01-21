import { IsEmail, isNotEmpty, IsNotEmpty, Max, MaxLength, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  company_name: string;

  @IsEmail()
  @MaxLength(50)
  @MinLength(3)
  company_email: string;

  isActive: boolean;

}
