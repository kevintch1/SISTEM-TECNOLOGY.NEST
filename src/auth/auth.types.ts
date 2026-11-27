import type { UserRole } from '../generated/prisma/client.js';

export type AuthTokenPayload = {
  id: number;
  email: string;
  role: UserRole;
};
