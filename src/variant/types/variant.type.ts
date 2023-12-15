import { CommonResponse } from '../../common/types/common-response.type';

export interface VariantDetailResponseData {
  bagId: number;
  stock: string;
  color: string;
  price: string;
  bag_image: string[];
  condition?: string;
  IsAvailable: boolean;
}

export interface UpdateVariantData {
  bag_image?: string[];
  stock?: string;
  color?: string;
  price?: string;
  IsAvailable?: boolean;
  condition?: string;
  bagId?: number;
}

export type VariantTable = Promise<CommonResponse<VariantDetailResponseData>>;
export type UpdateVariantTable = Promise<CommonResponse<UpdateVariantData>>;
