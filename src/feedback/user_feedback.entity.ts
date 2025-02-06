// user-feedback.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { User } from '';
import { User } from '../user/user.entity';
import { Feedback } from './feedback.entity';

@Entity('user_feedback')
export class UserFeedback {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.userFeedbacks)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Feedback, feedback => feedback.userFeedbacks)
  @JoinColumn({ name: 'feedback_id' })
  feedback: Feedback;
}
