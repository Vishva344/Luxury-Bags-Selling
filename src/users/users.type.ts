import { CommonResponse } from 'src/common/types/common-response.type';

/**
 * @ignore
 */
export interface UserDetailResponseData {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  IsDeactivate: boolean;
  role: string;
  location: string;
}

export interface UpdateData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  location?: string;
}

export enum SortFields {
  NAME = 'name',
  EMAIL = 'email',
}

export type UsersTable = Promise<CommonResponse<UserDetailResponseData>>;
