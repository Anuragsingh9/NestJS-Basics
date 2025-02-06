import { IsNotEmpty } from 'class-validator';
import { UserFeedback } from 'src/feedback/user_feedback.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  name: string;

  @Column({ unique: true, nullable: false, length: 50 })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: false, length: 5000 })
  password: string;

  @Column({
    type: 'text',
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(() => UserFeedback, userFeedback => userFeedback.user)
  userFeedbacks: UserFeedback[];
}
