import "i18next";
import { en } from "../locales/en";
import { JWTPayload } from "./auth.types";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en;
    };
  }
}


declare global {
  namespace Express {
    interface Request {
      user: JWTPayload
    }
  }
}