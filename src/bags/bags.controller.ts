import { Body, Controller, Post } from '@nestjs/common';
import { BagsService } from './bags.service';
import { BagTable } from './types/bags.type';
import { CreateBagDto } from './dtos/create-bag.dto';

@Controller('bags')
export class BagsController {
  constructor(private readonly bagsService: BagsService) {}

  @Post()
  async createBag(@Body() createBagDto: CreateBagDto): BagTable {
    return this.bagsService.createBag(createBagDto);
  }
}
