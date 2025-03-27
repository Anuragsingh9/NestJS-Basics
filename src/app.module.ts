import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { EmailService } from './common/email.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT),
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      url: process.env.DATABASE_URL, // Using .env variable
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Sync entities with the database (use only in development)
      ssl: {
        rejectUnauthorized: false, // Required for some cloud databases
      },
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    CompanyModule,
    FeedbackModule,
  ],
  providers: [
    CronService,
    EmailService
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule { }
