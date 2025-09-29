import { sign, verify } from "jsonwebtoken";
import env from "../../configs/env.config";
import { JWTPayload } from "../../types/auth.types";


export const encrypt = ( { phone, id, userRole }: JWTPayload ) => {
  return sign({ phone, id, userRole }, env.JWT_SECRET.toString(), { expiresIn: "30d" })
};

export const decrypt =  (token: string) => {
  const decoded = verify(token, env.JWT_SECRET.toString()) as JWTPayload
  return decoded
};



