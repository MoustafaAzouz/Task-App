import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()  
  title?: string;  

  @IsString()
  @IsOptional()  
  description?: string; 

  @IsString()
  @IsOptional() 
  category?: string; 

  @IsDateString()
  @IsOptional()  
  dueDate?: string;  

  @IsBoolean()
  @IsOptional() 
  isCompleted?: boolean;  
}
