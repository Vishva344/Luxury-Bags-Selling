import {
  Body,
  Get,
  Controller,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { VariantService } from './variant.service';
import { CreateVariantDto } from './dtos/create-variant.dto';
import { VariantTable } from './types/variant.type';
import { FileUploadInterceptor } from '../common/interceptors/file-upload-interceptor.service';
import { CommonFile, CommonResponsePromise } from '../common/types/common.type';
import { UpdateVariantDto } from './dtos/update-variant.dto';
import { RequestVerify } from '../common/guards/request-verify.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { User } from '../typeorm';

@UseGuards(RequestVerify, RoleGuard)
@Controller('variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Post()
  @UseInterceptors(FileUploadInterceptor)
  async createVariant(
    @RequestUser() user: User,
    @Body() createVariantDto: CreateVariantDto,
    @UploadedFiles(new ParseFilePipeBuilder().build({ fileIsRequired: false })) file: CommonFile[],
  ): VariantTable {
    return this.variantService.createVariant(user, createVariantDto, file);
  }

  @Post(':variantId')
  @UseInterceptors(FileUploadInterceptor)
  async updateVariant(
    @RequestUser() user: User,
    @Param('variantId') variantId: number,
    @Body()
    updateVariantDto: UpdateVariantDto,
    @UploadedFiles(new ParseFilePipeBuilder().build({ fileIsRequired: false })) file?: CommonFile[],
  ): CommonResponsePromise {
    return this.variantService.updateVariant(user, variantId, updateVariantDto, file);
  }

  @Get()
  async getVariant(): Promise<void> {
    return this.variantService.getVariant();
  }
}
