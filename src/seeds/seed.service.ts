/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm';
import { Repository } from 'typeorm';
import { Defaults } from '../config/default.config';
// import { Admin, AdminDocument } from '../admin/schemas/admin.schema';

@Injectable()
export class SeedsService {
  /**
   * Seed Service Constructor
   * @param adminModel
   */
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async seedAdmin(): Promise<string> {
    const existingUsers = await this.userRepository.find();

    const adminSeed = {
      firstName: 'Sasken',
      lastName: 'Admin',
      email: Defaults.SUPER_ADMIN_EMAIL,
      password: await bcrypt.hash(Defaults.SUPER_ADMIN_PASSWORD, 10),
      resetPasswordExpiryTime: '',
      resetPasswordToken: '',
      role: 'admin',
      isActive: true,
      isDeleted: false,
    };

    if (existingUsers.length === 0) {
      await this.userRepository.create(adminSeed);
      console.log('User data seeded successfully.');
      return 'User data seeded successfully.';
    } else {
      console.log('User data already exists. Skipping seeding.');
      return 'User data already exists. Skipping seeding.';
    }
  }
}
