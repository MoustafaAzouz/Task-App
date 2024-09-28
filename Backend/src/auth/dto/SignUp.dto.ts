import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20) 
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
