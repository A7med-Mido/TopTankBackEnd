import { decrypt } from "../utils/helpers/jwt.helper"
import { Request, Response, NextFunction } from "express"
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken"
import { STATUS } from "../utils/constants/http-status"
import { JWTPayload } from "../types/auth.types"
import RevokedTokenModel from "../database/models/RevokedTokens.model"

export const isAuthenticatedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(STATUS.UNAUTHORIZED).json({
      message: req.t("auth.missingAuthHeader"),
      success: false
    })
  }
  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  if(!token) {
    return res.status(STATUS.UNAUTHORIZED).json({
      message: req.t("auth.missingJWT"),
      success: false
    })
  }
  try {
    const revokedToken = await RevokedTokenModel.find({ token })
    if(revokedToken) {
      return res.status(STATUS.UNAUTHORIZED).json({
        message: req.t("auth.invalidToken"),
        success: false
      })
    }

    req.user = decrypt(token) as JWTPayload
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(STATUS.UNAUTHORIZED).json({
        message: req.t("auth.expiredToken"),
        success: false
      })
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(STATUS.UNAUTHORIZED).json({
        message: error.message,
        success: false
      })
    }
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false
    })
  }
}