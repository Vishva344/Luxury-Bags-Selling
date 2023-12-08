import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { LoginResponse } from './types/auth.types';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../common/types/jwt-payload.type';
import { ResponseHandler } from '../common/response-handler';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): LoginResponse {
    const admin = await this.userRepository.findOne({ where: { email: loginDto.email } });

    if (!admin) throw new NotFoundException('not found');

    const passwordMatch = await bcrypt.compare(loginDto.password, admin.password);
    if (!passwordMatch) throw new UnauthorizedException('incorrect password');

    const payload: JwtPayload = {
      id: admin.id,
      email: loginDto.email,
      p: loginDto.password,
      role: admin.role,
    };

    return ResponseHandler.success(
      {
        id: admin.id,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        password: admin.password,
        name: admin.name,
        role: admin.role,
        token: this.jwtService.sign(payload),
      },
      'successfully login',
      HttpStatus.OK,
    );
  }
}
