import { Body, Controller, Get, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Company } from './company.entity';
import { CreateCompanyDto } from './create-company.dto';
import { CompanyService } from './company.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/constants/roles.enum';
import { RolesGuard } from 'src/gaurds/roles.gaurd';
import { sendHttpResponse } from 'src/helpers/helper';
import { Request } from 'express';
import { EmailService } from 'src/common/email.service';
import { registerCompanyTemplate, registerTemplate } from 'src/email/email-template';

@Controller('company')
@UseGuards(AuthGuard, RolesGuard)
export class CompanyController {

    constructor(
        private companyService: CompanyService,
        private emailService: EmailService
    ) { }

    /**
     * This function is responsible for creating a new company
     * @param data 
     * @returns 
     */
    @Post()
    @Roles(Role.SuperAdmin)
    async createCompany(@Body(new ValidationPipe()) data: CreateCompanyDto) {
        try {
            const company = await this.companyService.createCompany(data);
            this.emailService.sendEmail(company.company_email, 'Registration Successful', 'Registration Successful', registerCompanyTemplate(company));
            return sendHttpResponse(201, 'Record added successfully', company);

        } catch (error) {
            
            return sendHttpResponse(500, 'Error adding record', error.message);
        }
    }

    @Get()
    @Roles(Role.SuperAdmin)
    async getCompanyList(@Req() req: Request){
        try {
            const companies = await this.companyService.getCompanyList();
            return sendHttpResponse(200,'Company list',companies);
        } catch (error) {
            return sendHttpResponse(500,'Internal server error',error.message);
        }
    }

    @Get(':id')
    @Roles(Role.SuperAdmin,Role.Admin)
    async getCompany(@Param('id') id: number){
        const company = await this.companyService.findCompany(id);
        if(!company){
            return sendHttpResponse(404,'Record not found');
        }
        return sendHttpResponse(200,'Company details',company);
    }
}
