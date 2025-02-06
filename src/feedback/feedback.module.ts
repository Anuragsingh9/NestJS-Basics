import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { UserFeedback } from './user_feedback.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule,TypeOrmModule.forFeature([Feedback,UserFeedback])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {} 
