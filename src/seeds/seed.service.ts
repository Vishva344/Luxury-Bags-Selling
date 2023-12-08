/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm';
import { Repository } from 'typeorm';
import { Defaults } from '../config/default.config';
import { Role } from '../common/types/common.type';
// import { Admin, AdminDocument } from '../admin/schemas/admin.schema';

@Injectable()
export class SeedsService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async seedAdmin(): Promise<string> {
    const existingUsers = await this.userRepository.find();
    console.log('🚀 ~ file: seed.service.ts:21 ~ SeedsService ~ seedAdmin ~ existingUsers:', existingUsers);

    const adminSeed = {
      name: 'Admin',
      email: Defaults.SUPER_ADMIN_EMAIL,
      phoneNumber: '1234567890',
      password: await bcrypt.hash(Defaults.SUPER_ADMIN_PASSWORD, 10),
      role: Role.ADMIN,
      IsDeactivate: false,
    };
    console.log('🚀 ~ file: seed.service.ts:31 ~ SeedsService ~ seedAdmin ~ adminSeed:', adminSeed);

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
