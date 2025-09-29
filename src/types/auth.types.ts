import { UserRole } from "../middlewares/zod.validator";

export type JWTPayload = {
  phone: string
  id: string,
  userRole: UserRole
};