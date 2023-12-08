import { Role } from './common.type';

export interface JwtPayload {
  id: number;
  email: string;
  role: Role;
  p: string;
}

/**
 * @ignore
 */
export interface RequestWithPayload extends Request {
  user?: JwtPayload;
}
