import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersTable } from './users.type';
import { CommonResponsePromise, Role } from '../common/types/common.type';
import { UpdateUserDto } from './dtos/update-user.dto';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';
import { RequestVerify } from '../common/guards/request-verify.guard';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
@UseGuards(RoleGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): UsersTable {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(RequestVerify)
  @Roles(Role.BUYER, Role.SELLER)
  @Post(':id')
  async updateUser(
    @RequestUser() user: User,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): CommonResponsePromise {
    return this.usersService.updateUser(user, id, updateUserDto);
  }

  @Get('AllUser')
  @Roles(Role.SELLER)
  async getAllUser(@RequestUser() user: User): CommonResponsePromise {
    return this.usersService.getAllUser(user);
  }

  @Get(':id')
  @Roles(Role.BUYER, Role.SELLER)
  async getUser(@RequestUser() user: User, @Param('id') id: number): CommonResponsePromise {
    return this.usersService.getUser(user, id);
  }

  @Delete(':id')
  async deleteUser(@RequestUser() user: User, @Param('id') id: number): CommonResponsePromise {
    return this.usersService.deleteUser(user, id);
  }
}
