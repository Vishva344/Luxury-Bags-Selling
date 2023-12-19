import { CommonResponse } from '../../common/types/common-response.type';

export interface VariantDetailResponseData {
  bagId: number;
  stock: string;
  color: string;
  price: number;
  bag_image: string[];
  condition?: string;
  IsAvailable: boolean;
}

export interface UpdateVariantData {
  bag_image?: string[];
  stock?: string;
  color?: string;
  price: number;
  IsAvailable?: boolean;
  condition?: string;
  bagId?: number;
}

export enum SortFields {
  PRICE = 'Price',
  CREATEDAT = 'createdAt',
}

export type VariantTable = Promise<CommonResponse<VariantDetailResponseData>>;
export type UpdateVariantTable = Promise<CommonResponse<UpdateVariantData>>;
