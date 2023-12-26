import { CommonResponse } from '../../common/types/common-response.type';
import { Bag } from '../entities/bags.entity';

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
  userId: number;
  bagName: string;
  brandName: string;
  bag_information: string;
  bag_type?: string;
  bag_category: string;
  gender: string;
  offers?: DataType[];
  bag_size: string;
}

export enum SortFields {
  NAME = 'bagName',
  EMAIL = 'brandName',
}

export type BagTable = Promise<CommonResponse<Bag>>;
