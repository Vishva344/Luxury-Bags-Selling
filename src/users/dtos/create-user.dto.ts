import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../../common/types/common.type';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @IsEnum(Role)
  role: string;

  @IsString()
  @IsNotEmpty()
  IsDeactivate: boolean;
}
