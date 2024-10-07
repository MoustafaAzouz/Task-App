import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignupDto): Promise<{ token: string}> {
    const { name, email, password } = signUpDto;

    const emailExists = await this.userRepository.findOne({ where: { email } });
    if (emailExists) {
      throw new UnauthorizedException('User with this email already exists');
    }

    const nameExists = await this.userRepository.findOne({ where: { name } });
    if (nameExists) {
      throw new BadRequestException(`The name "${name}" is already taken.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ name, email, password: hashedPassword });
    await this.userRepository.save(user);

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return { token};
  }

  async login(loginDto: LoginDto): Promise<{ token: string}> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return { token };
  }
}
