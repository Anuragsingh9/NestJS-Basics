import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Company } from './company.entity';
import { CreateCompanyDto } from './create-company.dto';
import { CompanyService } from './company.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/constants/roles.enum';
import { RolesGuard } from 'src/gaurds/roles.gaurd';

@Controller('company')
@UseGuards(AuthGuard,RolesGuard)
export class CompanyController {
    constructor(private companyService: CompanyService){}

    @Post()
    @Roles(Role.User)
    async createCompany(@Body(new ValidationPipe()) data: CreateCompanyDto){
        return this.companyService.createCompany(data);
    }
}
