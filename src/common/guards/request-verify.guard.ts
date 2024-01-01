import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from '../types/jwt-payload.type';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { errorMessages } from '../../config/messages.config';
import { User } from '../../users/entities/user.entity';

/**
 * Description - Request Verify Guard
 */
@Injectable()
export class RequestVerify implements CanActivate {
  /**
   * Description - Request Verify Guard Dependencies
   * @param adminModel
   * @param jwtService
   * @param configService
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Description - Check valid request & append user info to request object
   * @param context
   * @returns boolean value
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userToken = request.headers.authorization?.replace('Bearer ', '');

    const payload: JwtPayload = await this.jwtService.verifyAsync(userToken, {
      secret: this.configService.get<string>('SECRET_KEY'),
    });

    if (!payload) throw new UnauthorizedException('unAuthorized');

    const user = await this.userRepository.findOne({ where: { id: payload.id, email: payload.email } });

    if (user.role !== payload.role) {
      throw new UnauthorizedException('unAuthorized');
    }

    const userDetails = await this.userRepository.findOne({ where: { id: user.id } });
    if (!userDetails) throw new NotFoundException(errorMessages.USER_NOT_FOUND);

    request['user'] = payload;
    return true;
  }
}
