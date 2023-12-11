import { Body, Controller, ParseFilePipeBuilder, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { VariantService } from './variant.service';
import { CreateVariantDto } from './dtos/variant.dto';
import { VariantTable } from './types/variant.type';
import { FileUploadInterceptor } from '../common/interceptors/file-upload-interceptor.service';
import { CommonFile } from '../common/types/common.type';

@Controller('variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Post()
  @UseInterceptors(FileUploadInterceptor)
  async createVariant(
    @Body() createVariantDto: CreateVariantDto,
    @UploadedFiles(new ParseFilePipeBuilder().build({ fileIsRequired: false })) file: CommonFile[],
  ): VariantTable {
    return this.variantService.createVariant(createVariantDto, file);
  }
}
