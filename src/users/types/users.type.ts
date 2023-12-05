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

export type usersTable = Promise<CommonResponse<UserDetailResponseData>>;
