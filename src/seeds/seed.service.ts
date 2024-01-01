/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
// import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Defaults } from '../config/default.config';
import { Role } from '../common/types/common.type';
import { hash } from 'bcrypt';
import { User } from '../users/entities/user.entity';
// import { Admin, AdminDocument } from '../admin/schemas/admin.schema';

@Injectable()
export class SeedsService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async seedAdmin(): Promise<string> {
    const existingUsers = await this.userRepository.find();

    const adminSeed = {
      name: 'Admin',
      email: Defaults.SUPER_ADMIN_EMAIL,
      phoneNumber: '1234567890',
      password: await hash(Defaults.SUPER_ADMIN_PASSWORD, 10),
      role: Role.BUYER,
      IsDeactivate: false,
    };

    if (existingUsers.length === 0) {
      await this.userRepository.save(adminSeed);
      console.log('User data seeded successfully.');
      return 'User data seeded successfully.';
    } else {
      console.log('User data already exists. Skipping seeding.');
      return 'User data already exists. Skipping seeding.';
    }
  }
}
