import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bags } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BagsService {
  constructor(
    @InjectRepository(Bags) private readonly userRepository: Repository<Bags>,
  ) {}
}
