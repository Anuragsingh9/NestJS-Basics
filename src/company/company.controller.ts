import { Body, Controller, Get, Param, Post, Req, UseGuards, ValidationPipe, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '../../src/auth/auth.guard';
import { CreateCompanyDto } from './create-company.dto';
import { CompanyService } from './company.service';
import { Roles } from '../../src/decorators/roles.decorator';
import { Role } from '../../src/constants/roles.enum';
import { RolesGuard } from '../../src/gaurds/roles.gaurd';
import { sendHttpResponse } from '../../src/helpers/helper';
import { Express, Request } from 'express';
import { EmailService } from '../../src/common/email.service';
import { registerCompanyTemplate, registerTemplate } from '../../src/email/email-template';
import { Multer } from 'multer';

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

    @Post('/upload-logo')
    @Roles(Role.SuperAdmin,Role.Admin)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads', // Set your desired upload directory
          filename: (req, file, cb) => {
            const fileExtName = extname(file.originalname);
            const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExtName}`;
            cb(null, fileName);
          },
        }),
        fileFilter: (req, file, cb) => {
          if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            return cb(new BadRequestException('Only image files are allowed!'), false);
          }
          cb(null, true);
        },
        limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
      }))

      /**
       * This function is responsible for uploading company logo
       */
    async uploadFile(@UploadedFile() file: Multer.File, @Body() body: any) {
        try {
            
            if (!file) {
                throw new BadRequestException('File is required!');
            }
            const { company_id } = body;
            const companyExist = await this.companyService.findCompany(company_id);

            if(!companyExist){
                return sendHttpResponse(404,'Company not found');
            }

            const isRecordUpdated = await this.companyService.uploadCompanyLogo(file.filename, company_id);
            
            if(isRecordUpdated.affected === 0){
                return sendHttpResponse(400,'Error updating company logo');
            }
            const companyDetails = await this.companyService.findCompany(company_id);
            return sendHttpResponse(200, 'File uploaded successfully', companyDetails);
        } catch (error) {
            return sendHttpResponse(500,'Internal server error',error.message);
        }
    }
}
