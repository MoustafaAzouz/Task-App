import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    findAll(req: any, id: string): Promise<Task[]>;
    getTaskById(id: string, req: any): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    updateTaskById(id: string, updateTaskDto: UpdateTaskDto, req: any): Promise<Task>;
    deleteTaskById(id: string, req: any): Promise<void>;
    getTasksByCategory(category: string, id: number): Promise<Task[]>;
}
