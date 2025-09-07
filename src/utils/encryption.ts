import { sign, verify } from "jsonwebtoken";
import crypto, { hash, randomInt } from "crypto";
import { Request } from "express";

export type JWTPayload = {
  phone: string
  password: string
};

export const encrypt = ( { phone, password }: JWTPayload ): string => {
  return sign({ phone, password }, String(process.env.JWT_SECRET));
};

export const decrypt =  (token: string) => {
  const decoded = verify(token, process.env.JWT_SECRET as string) as JWTPayload
  return decoded
};

export const hashPassword = ({ password }:{ password: string }) => {
  const hashedPass = hash(password, String(process.env.JWT_SECRET));
  return hashedPass
};

export const generateOtp = () => {
  return String(randomInt(100000, 999999))
};