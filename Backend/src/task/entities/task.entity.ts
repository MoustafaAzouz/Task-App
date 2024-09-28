import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/User.entity';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    category: string;

    @Column({ nullable: true })
    dueDate: Date;

    @Column({ default: false })
    isCompleted: boolean;

    @ManyToOne(() => User, (user) => user.tasks) 
    user: User; 

    @Column({ nullable: true })
    userId: number;
}
