import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { EmailService } from 'src/common/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, EmailService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
