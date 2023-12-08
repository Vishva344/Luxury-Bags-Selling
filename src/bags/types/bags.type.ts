import { CommonResponse } from '../../common/types/common-response.type';

export enum BagType {
  Tote = 'Tote',
  Backpack = 'Backpack',
  Messenger = 'Messenger',
  Clutch = 'Clutch',
  Other = 'Other',
}

export enum BagCategory {
  Leather = 'Leather',
  Canvas = 'Canvas',
  Travel = 'Travel',
  Laptop = 'Laptop',
  Other = 'Other',
}

export enum Gender {
  Women = 'women',
  Men = 'men',
  Kids = 'kids',
}

export interface BagDetailResponseData {
  bagName: string;
  brandName: string;
  bag_information: string;
  bag_type?: string;
  bag_category: string;
  gender: string;
  offers: string;
  bag_size: string;
}

export type bagTable = Promise<CommonResponse<BagDetailResponseData>>;
