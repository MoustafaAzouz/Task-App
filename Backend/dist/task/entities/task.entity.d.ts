import { User } from '../../auth/entities/User.entity';
export declare class Task {
    id: number;
    title: string;
    description?: string;
    category: string;
    dueDate: Date;
    isCompleted: boolean;
    user: User;
    userId: number;
}
