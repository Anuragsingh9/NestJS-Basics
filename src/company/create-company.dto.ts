import { IsEmail, isNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  company_name: string;

  @IsEmail()
  company_email: string;

  isActive: boolean;

}
