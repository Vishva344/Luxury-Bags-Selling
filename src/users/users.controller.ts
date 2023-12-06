import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { usersTable } from './types/users.type';
import { CommonResponsePromise } from '../common/types/common.type';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): usersTable {
    return this.usersService.createUser(createUserDto);
  }

  @Post(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): CommonResponsePromise {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Get('AllUser')
  async getAllUser(): CommonResponsePromise {
    return this.usersService.getAllUser();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): CommonResponsePromise {
    return this.usersService.getUser(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): CommonResponsePromise {
    return this.usersService.deleteUser(id);
  }
}
