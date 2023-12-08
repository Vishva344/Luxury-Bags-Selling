import { Body, Controller, Post } from '@nestjs/common';
import { BagsService } from './bags.service';
import { bagTable } from './types/bags.type';
import { CreateBagDto } from './dtos/create-bag.dto';

@Controller('bags')
export class BagsController {
  constructor(private readonly bagsService: BagsService) {}

  @Post()
  async createBag(@Body() createBagDto: CreateBagDto): bagTable {
    console.log('******************************************************');

    return this.bagsService.createBag(createBagDto);
  }
}
