import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { usersTable } from './types/users.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): usersTable {
    return this.usersService.createUser(createUserDto);
  }

  @Post()
  async updateUser(@Body() createUserDto: CreateUserDto): usersTable {
    return this.usersService.updateUser(createUserDto);
  }
}
