import { sign, verify } from "jsonwebtoken";
import { randomInt, scryptSync, timingSafeEqual } from "crypto";
import env from "../configs/env.config";
import { UserRole } from "../types/zodValidation";

export type JWTPayload = {
  phone: string
  password: string,
  user: UserRole
};

export const encrypt = ( { phone, password, user }: JWTPayload ) => {
  return sign({ phone, password, user }, env.JWT_SECRET.toString());
};

export const decrypt =  (token: string) => {
  const decoded = verify(token, env.JWT_SECRET.toString()) as JWTPayload
  return decoded
};

const keylen = 64; // 512-bit output
export const hashPassword = (password: string) => {
  const hash = scryptSync(password, env.SALT.toString(), keylen).toString('hex');
  return hash
};
export const verifyPassword = (password: string, storedHash: string): boolean => {
  const hashToVerify = scryptSync(password, env.SALT.toString(), keylen);
  const storedHashBuffer = Buffer.from(storedHash, 'hex');
  return timingSafeEqual(hashToVerify, storedHashBuffer);
};


export const generateOtp = () => {
  return String(randomInt(100000, 999999))
};