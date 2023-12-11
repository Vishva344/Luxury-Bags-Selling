import { CommonResponse } from '../../common/types/common-response.type';

export interface VariantDetailResponseData {
  bag_id: number;
  stock: string;
  color: string;
  price: string;
  bag_image: string;
  condition?: string;
  IsAvailable: boolean;
}

export type VariantTable = Promise<CommonResponse<VariantDetailResponseData>>;
