import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/entities/task.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { ScrapModule } from './scrap/scrap.module';
AuthModule

@Module({
  imports: [TaskModule,ScrapModule,AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',        
      host: process.env.DB_HOST, 
      port: parseInt(process.env.DB_PORT, 10), 
      
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_NAME,
      entities: [Task,User],
      synchronize: true,
      autoLoadEntities: true 
    }),
    ScrapModule,

    
    TypeOrmModule.forFeature([Task, User]), 


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {



}
