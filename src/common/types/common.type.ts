import { CommonResponse } from './common-response.type';

/**
 * @ignore
 */
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  SELLER = 'seller',
  BUYER = 'buyer',
}

/**
 * @ignore
 */
export type CommonResponsePromise = Promise<CommonResponse>;
