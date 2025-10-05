import { sign, verify } from "jsonwebtoken";
import env from "../../configs/env.config";
import { JWTPayload } from "../../types/auth.types";


export const encrypt = ({ phone, id, userRole }: JWTPayload) => {

  return sign({ 
    phone,
    id,
    userRole,

  },
  env.JWT_SECRET.toString(),{
    expiresIn: userRole === "admin"? "5h": "90d",
    issuer: env.TOKEN_ISSUER,
    audience: env.TOKEN_AUDIENCE
  })
}

export const decrypt =  (token: string) => {
  const decoded = verify(token, env.JWT_SECRET.toString(),{
    issuer: env.TOKEN_ISSUER,
    audience: env.TOKEN_AUDIENCE
  }) as JWTPayload
  return decoded
};