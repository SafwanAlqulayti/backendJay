import { UserRole } from './user-role.enum';

export interface JwtPayload {
  email: string;
  role: UserRole;
  id: string;
}
