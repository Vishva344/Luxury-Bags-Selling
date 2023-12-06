import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateData, usersTable } from './types/users.type';
import { ResponseHandler } from 'src/common/response-handler';
import { CommonResponsePromise } from '../common/types/common.type';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async createUser(createUserDto: CreateUserDto): usersTable {
    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email.trim(),
      password: await this.hashPassword(createUserDto.password),
      phoneNumber: createUserDto.phoneNumber,
      IsDeactivate: createUserDto.IsDeactivate,
    });

    await this.userRepository.save(user);

    return ResponseHandler.success(user, 'User created successfully', HttpStatus.OK);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): CommonResponsePromise {
    const userDetails = await this.userRepository.findOne({ where: { id } });

    if (!userDetails) throw new NotFoundException('not found');

    const updateData: UpdateData = {
      name: updateUserDto.name,
      email: updateUserDto.email,
      phoneNumber: updateUserDto.phoneNumber,
    };

    await this.userRepository.update(id, updateData);

    return ResponseHandler.success({}, 'User updated successfully', HttpStatus.OK);
  }

  async getAllUser(): CommonResponsePromise {
    const users = await this.userRepository.find();
    return ResponseHandler.success({ users }, 'All user List', HttpStatus.OK);
  }

  async getUser(id: number): CommonResponsePromise {
    const userData = await this.userRepository.findOne({ where: { id } });
    return ResponseHandler.success({ userData }, 'get user successfully', HttpStatus.OK);
  }

  async deleteUser(id: number): CommonResponsePromise {
    const userToDelete = await this.userRepository.findOne({ where: { id } });
    if (!userToDelete) throw new NotFoundException('not found');

    await this.userRepository.delete(id);

    return ResponseHandler.success({ user: userToDelete }, 'User deleted successfully', HttpStatus.OK);
  }
}
