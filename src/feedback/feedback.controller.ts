import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/gaurds/roles.gaurd';
import { sendHttpResponse } from 'src/helpers/helper';
import { AddFeedbackDto } from './add-feedback.dto';
import { Request } from 'express';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
@UseGuards(AuthGuard, RolesGuard)
export class FeedbackController {

    constructor(private feedbackService: FeedbackService){}

    @Post()
    async addFeedback(@Req() req: Request, @Body(new ValidationPipe()) addFeedbackParam: AddFeedbackDto ){
        try {
            const authUser = req['user'];

            const feedback = await this.feedbackService.addFeedback(addFeedbackParam,authUser);
            return sendHttpResponse(201,'Feedback added successfully');

        } catch (error) {
            return sendHttpResponse(400, 'Error fetching user profile', error.message);
        }
    }

    @Get()
    async getUserFeedback(@Req() req: Request){
        try {
            const feedbacks = await this.feedbackService.fetchUserFeedback(req.query);
            return sendHttpResponse(200,'User feedbacks fetched successfully',feedbacks);

        } catch (error) {
            return sendHttpResponse(500,'Internal server error',error.message);
        }
    }

}
