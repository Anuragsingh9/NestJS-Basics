import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { hashPassword } from 'src/helpers/helper';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        private readonly userService: UserService
    ) { }

        /**
         * Function to create company
         * @param data 
         */
        async createCompany(data: Partial<Company>): Promise<Company>{
            const company = await this.companyRepository.create(data);
            const companyData = await this.companyRepository.save(company);
            const password = await hashPassword(data.company_email);
            const userParam = {
                name: data.company_name,
                email: data.company_email,
                isActive: true,
                password: password,
                roles: ['admin'],
                company_id: company.id
            }
            const user = await this.userService.createUser(userParam);
            return companyData;
        }

        /**
         * This function is responsible for getting the list of companies
         * @returns 
         */
        async getCompanyList(){
            const companies = await this.companyRepository.find();
            return companies;
        }

        /**
         * This function is responsible for getting the details of a company
         * @param id number
         * @returns company Object
         */
        async findCompany(id: number){
            const company = await this.companyRepository.findOne({ where:{id: id}});
            return company;
        }
}
