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
}

export interface UpdateData {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

export type usersTable = Promise<CommonResponse<UserDetailResponseData>>;
