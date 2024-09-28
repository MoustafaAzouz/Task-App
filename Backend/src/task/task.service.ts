import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../auth/entities/User.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

      async create(createTaskDto: CreateTaskDto): Promise<Task> {
          const user = await this.userRepository.findOne({ where: { name: createTaskDto.userName } });
  
          if (!user) {
              throw new NotFoundException('User not found');
          }
  
          const newTask = this.taskRepository.create({
              ...createTaskDto,
              userId: user.id,  
          });
  
          return await this.taskRepository.save(newTask);  
      }
  
  
      async findAllByUserId(userId: number): Promise<Task[]> {
        return this.taskRepository.find({ where: {  userId} });
    }

   

  async findById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: user.id } }, 
      relations: ['user'], 
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    return task;
  }

async updateById(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {

  const task = await this.findById(id, user);

  if (!Object.keys(updateTaskDto).length) {
    throw new BadRequestException('No update data provided.'); 
  }

  Object.assign(task, updateTaskDto);

  const updatedTask = await this.taskRepository.save(task);

  return updatedTask;
}




  async deleteById(id: number, user: User): Promise<void> {
    const task = await this.findById(id, user);  
    await this.taskRepository.remove(task); 
  }

  async getTasksByCategory(category: string, userId:number): Promise<Task[]> {


    const tasks = await this.taskRepository.find({
      where: { category, userId }

    })

    if (tasks.length === 0) {
      throw new NotFoundException(`No tasks found for category: ${category}`);
    }

    return tasks;
  }
}
