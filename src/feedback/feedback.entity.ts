import { MaxLength, MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { UserFeedback } from './user_feedback.entity';
import { FEEDBACK_TYPE } from 'src/constants/roles.enum';

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    feedback_text: string;

    @Column({
        type: 'enum',
        enum: FEEDBACK_TYPE,
        default: FEEDBACK_TYPE.OTHER,
    })
    feedback_type: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true }) // This column will store the deletion timestamp
    deletedAt: Date | null;

    @OneToMany(() => UserFeedback, userFeedback => userFeedback.user)
    userFeedbacks: UserFeedback[];
}
