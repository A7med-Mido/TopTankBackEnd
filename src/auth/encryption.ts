import { sign, verify } from "jsonwebtoken";
import { randomInt } from "crypto";
import env from "../configs/env.config";
import { UserRole } from "../middlewares/zodValidators";
import { hash, compare } from "bcrypt"

export type JWTPayload = {
  phone: string
  id: string,
  user: UserRole
};

export const encrypt = ( { phone, id, user }: JWTPayload ) => {
  return sign({ phone, id, user }, env.JWT_SECRET.toString(), { expiresIn: "30d" });
};

export const decrypt =  (token: string) => {
  const decoded = verify(token, env.JWT_SECRET.toString()) as JWTPayload
  return decoded
};

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword
};

export const verifyPassword = async ({
  password,
  storedHash,
}: {
  password: string;
  storedHash: string;
}): Promise<boolean> => {

  return await compare(password, storedHash);
};


export const generateOtp = () => {
  return String(randomInt(100000, 999999))
};