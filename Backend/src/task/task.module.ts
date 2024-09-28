import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from 'src/auth/auth.module';
import { User } from '../auth/entities/User.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Task,User]), AuthModule, PassportModule]   ,

  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
