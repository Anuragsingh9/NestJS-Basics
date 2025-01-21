import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Company } from './company.entity';
import { CreateCompanyDto } from './create-company.dto';
import { CompanyService } from './company.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/constants/roles.enum';
import { RolesGuard } from 'src/gaurds/roles.gaurd';
import { sendHttpResponse } from 'src/helpers/helper';

@Controller('company')
@UseGuards(AuthGuard, RolesGuard)
export class CompanyController {

    constructor(private companyService: CompanyService) { }

    /**
     * This function is responsible for creating a new company
     * @param data 
     * @returns 
     */
    @Post()
    @Roles(Role.User)
    async createCompany(@Body(new ValidationPipe()) data: CreateCompanyDto) {
        try {
            const company = await this.companyService.createCompany(data);
            return sendHttpResponse(201, 'Record added successfully', company);

        } catch (error) {
            
            return sendHttpResponse(400, 'Error adding record', error.message);
        }
    }
}
