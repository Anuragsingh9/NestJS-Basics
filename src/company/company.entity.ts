import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    company_name: string;

    @Column()
    company_email: string;

    @Column({ default: true })
    isActive: boolean;
}
