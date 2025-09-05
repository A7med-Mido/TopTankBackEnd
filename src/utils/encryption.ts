import { sign, verify } from "jsonwebtoken";
import { hash } from "crypto";
import { Request } from "express";

export type JWT = {
  phone: string
  password: string
};

export const encrypt = ( { phone, password }: JWT ): string => {
  return sign({ phone, password }, String(process.env.JWT_SECRET));
};

export const decrypt = async (req: Request) => {
  const authHeader = req.headers["authorization"];
  if(!authHeader) return null
  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  return verify(token, String(process.env.JWT_SECRET));
};

export const hashPassword = ({ password }:{ password: string }) => {
  const hashedPass = hash(password, String(process.env.SALT));
  return hashedPass
};