import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string; 

  @IsString()
  @IsOptional()
  description?: string; 

  @IsString()
  @IsNotEmpty()
  category: string; 

  @IsDateString()
  @IsOptional()
  dueDate: string; 

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean = false;
}
