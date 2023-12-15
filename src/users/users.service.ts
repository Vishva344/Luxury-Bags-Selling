import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateData, UsersTable } from './types/users.type';
import { ResponseHandler } from 'src/common/response-handler';
import { CommonResponsePromise } from '../common/types/common.type';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from '../typeorm/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async createUser(createUserDto: CreateUserDto): UsersTable {
    const user: CreateUserDto = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      email: createUserDto.email.trim(),
    };
    await this.userRepository.save(user);

    return ResponseHandler.success(user, 'User created successfully', HttpStatus.OK);
  }

  async updateUser(user: User, id: string, updateUserDto: UpdateUserDto): CommonResponsePromise {
    const userDetails = await this.userRepository.findOne({ where: { id: user.id } });

    if (user.id !== parseInt(id)) throw new NotFoundException('un authorized **');
    if (!userDetails) throw new NotFoundException('not found');

    const updateData: UpdateData = {
      name: updateUserDto.name,
      email: updateUserDto.email,
      phoneNumber: updateUserDto.phoneNumber,
    };

    await this.userRepository.update(id, updateData);

    return ResponseHandler.success(updateData, 'User updated successfully', HttpStatus.OK);
  }

  async getAllUser(user: User): CommonResponsePromise {
    const users = await this.userRepository.find();
    return ResponseHandler.success({ users }, 'All user List', HttpStatus.OK);
  }

  async getUser(user: User, id: number): CommonResponsePromise {
    const userData = await this.userRepository.findOne({ where: { id } });
    return ResponseHandler.success({ userData }, 'get user successfully', HttpStatus.OK);
  }

  async deleteUser(user: User, id: number): CommonResponsePromise {
    const userToDelete = await this.userRepository.findOne({ where: { id } });
    if (!userToDelete) throw new NotFoundException('not found');

    await this.userRepository.delete(id);

    return ResponseHandler.success({ user: userToDelete }, 'User deleted successfully', HttpStatus.OK);
  }
}
