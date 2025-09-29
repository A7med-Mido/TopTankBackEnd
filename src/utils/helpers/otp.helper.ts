import { randomInt } from "crypto";



export const generateOtp = () => {
  return String(randomInt(100000, 999999))
};