import { UserRole } from "../zod/zod.validator";

export type JWTPayload = {
  phone: string
  id: string,
  userRole: UserRole
};