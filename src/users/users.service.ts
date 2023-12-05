import { Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { usersTable } from './types/users.type';
import { ResponseHandler } from 'src/common/response-handler';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async createUser(createUserDto: CreateUserDto): usersTable {
    // const user = {
    //   name: createUserDto.name,
    //   email: createUserDto.email.trim(),
    //   password: await this.hashPassword(createUserDto.password),
    //   phoneNumber: createUserDto.phoneNumber,
    //   IsDeactivate: createUserDto.IsDeactivate,
    // };

    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email.trim(),
      password: await this.hashPassword(createUserDto.password),
      phoneNumber: createUserDto.phoneNumber,
      IsDeactivate: createUserDto.IsDeactivate,
    });

    await this.userRepository.save(user);

    return ResponseHandler.success(
      user,
      'User created successfully',
      HttpStatus.OK,
    );
  }

  async updateUser(createUserDto: CreateUserDto): usersTable {
    const hashedPassword = await this.hashPassword(createUserDto.password);

    const user = new User();
    (user.name = createUserDto.name),
      (user.email = createUserDto.email.trim()),
      (user.password = hashedPassword),
      (user.phoneNumber = createUserDto.phoneNumber),
      (user.IsDeactivate = createUserDto.IsDeactivate),
      await this.userRepository.save(user);

    return ResponseHandler.success(
      user,
      'User Updated successfully',
      HttpStatus.OK,
    );
  }
}
