import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { Repository } from 'typeorm';
import { UserFeedback } from './user_feedback.entity';
import { AddFeedbackDto } from './add-feedback.dto';
import { AuthUser } from '../../src/common/interfaces/auth.interface';

@Injectable()
export class FeedbackService {

    constructor(
        @InjectRepository(Feedback) private feedbackRepository: Repository<Feedback>,
        @InjectRepository(UserFeedback) private userFeedbackRepository: Repository<UserFeedback>
     ){}

    async addFeedback(feedbackData: AddFeedbackDto,authUser: AuthUser) {
        const feedback = this.feedbackRepository.create(feedbackData);
        const feedbackModel = await this.feedbackRepository.save(feedback);
        const feedbackCreated = this.mapFeedbackToUser(authUser.id,feedbackModel)
        return feedbackCreated;
    }

    async mapFeedbackToUser(userId: number,feedback){
        const userFeedback = this.userFeedbackRepository.create({
            user: {id: userId},
            feedback: feedback
        });
        return await this.userFeedbackRepository.save(userFeedback);
    }

    async fetchUserSubmittedFeedbacks (query){
        const userFeedbacks = await  this.userFeedbackRepository.find({
            where :{ user: {id: query.user_id } },
            relations: ['feedback'],
        });

        return userFeedbacks;
    }

    async fetchUserFeedback(query){
        const userFeedback = await this.userFeedbackRepository.find({
            where: { feedback: {user_id: query.user_id}},
            relations: ['user','feedback'],
            select: {
                user: {
                  id: true, name: true, email: true,
                },
            }   
        });

        return userFeedback;
    }
}
