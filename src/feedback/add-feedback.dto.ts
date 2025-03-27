import { IsEmail, IsEnum, isNotEmpty, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { FEEDBACK_TYPE } from '../../src/constants/roles.enum';

export class AddFeedbackDto {

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(3)
  feedback_text: string;

  @IsNotEmpty()
  @IsEnum(FEEDBACK_TYPE,{message: 'Invalid feedback type'})
  feedback_type: string;
}
