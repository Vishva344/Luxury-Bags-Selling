import { CommonResponse } from '../../common/types/common-response.type';

export enum BagType {
  TOTE = 'Tote',
  BACKPACK = 'Backpack',
  MESSENGER = 'Messenger',
  CLUTCH = 'Clutch',
  OTHER = 'Other',
}

export enum BagCategory {
  LEATHER = 'Leather',
  CANVAS = 'Canvas',
  TRAVEL = 'Travel',
  LAPTOP = 'Laptop',
  OTHER = 'Other',
}

export enum Gender {
  WOMEN = 'women',
  MEN = 'men',
  KIDS = 'kids',
}

export interface DataType {
  id: number;
  offer: string;
}

export interface BagDetailResponseData {
  bagName: string;
  brandName: string;
  bag_information: string;
  bag_type?: string;
  bag_category: string;
  gender: string;
  offers?: DataType[];
  bag_size: string;
}

export type BagTable = Promise<CommonResponse<BagDetailResponseData>>;
