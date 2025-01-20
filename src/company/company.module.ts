import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Company]),
  ],
})

export class CompanyModule {}
