import { Controller, Get, Post, Put, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get(':id') 
    @UseGuards(AuthGuard('jwt')) 
    async findAll(@Req() req, @Param('id') id: string): Promise<Task[]> {
        if (!req.user) {
            throw new Error('User not authenticated');
        }

        return this.taskService.findAllByUserId(Number(id));
    }
    @Get('find/:id')
    @UseGuards(AuthGuard())
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.findById(Number(id));
    }

    @Post()
    @UseGuards(AuthGuard())
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskService.create(createTaskDto);
    }
    
  
    @Put(':id')
    @UseGuards(AuthGuard())
    async updateTaskById(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
        return this.taskService.updateById(Number(id), updateTaskDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteTaskById(@Param('id') id: string): Promise<void> {
        return this.taskService.deleteById(Number(id));
    }

  @Get('/:category/:id')
@UseGuards(AuthGuard())
async getTasksByCategory(
    @Param('category') category: string,
    @Param('id') id: number,


): Promise<Task[]> {
    return this.taskService.getTasksByCategory(category,id);
}

}
