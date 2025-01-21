import { MaxLength, MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 50 })
    company_name: string;

    @Column({ unique: true, length: 50 })
    company_email: string;

    @Column({ default: true })
    isActive: boolean;
}
