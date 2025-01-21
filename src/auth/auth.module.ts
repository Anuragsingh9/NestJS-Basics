import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/common/email.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,EmailService],
  exports: [AuthService]
})
export class AuthModule {
  constructor() {
    // console.log('JWT Secret:', process.env.JWT_SECRET); // Check if the secret is loaded properly
  }
}
