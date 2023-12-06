import { CommonResponse } from '../../common/types/common-response.type';

/**
 * @ignore
 */
export interface LoginData {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
  token: string;
}

export type LoginResponse = Promise<CommonResponse<LoginData>>;
