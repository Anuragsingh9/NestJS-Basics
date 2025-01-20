import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>) { }

        /**
         * Function to create company
         * @param data 
         */
        async createCompany(data: Partial<Company>): Promise<Company>{
            const company = this.companyRepository.create(data);
            return this.companyRepository.save(company);
        }
}
