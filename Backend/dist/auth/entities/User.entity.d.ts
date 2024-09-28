import { Task } from '../../task/entities/task.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    tasks: Task[];
    linkedin: string;
}
