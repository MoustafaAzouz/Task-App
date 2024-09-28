import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../auth/entities/User.entity';
export declare class TaskService {
    private readonly taskRepository;
    private readonly userRepository;
    constructor(taskRepository: Repository<Task>, userRepository: Repository<User>);
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    findAllByUserId(userId: number): Promise<Task[]>;
    findById(id: number, user: User): Promise<Task>;
    updateById(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task>;
    deleteById(id: number, user: User): Promise<void>;
    getTasksByCategory(category: string, userId: number): Promise<Task[]>;
}
