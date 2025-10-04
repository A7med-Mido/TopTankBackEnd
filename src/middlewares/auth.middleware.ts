import StudentModel from "../configs/models/Student.model"
import TeacherModel from "../configs/models/Teacher.model"
import { decrypt } from "../utils/helpers/jwt.helper"
import { Request, Response, NextFunction } from "express"
import { studentSchema, teacherSchema } from "./zod.validator"
import { ZodError } from "zod"
import { zodErrorFormatter } from "./zod.validator"
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken"
import { STATUS } from "../utils/constants/http-status"
import { JWTPayload } from "../types/auth.types"

export const isUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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

export const isUserExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body
    const { userRole } = req.params
    
    if(userRole === "student") {
      const { phone } = studentSchema.parse(userData)
      const student = await StudentModel.findOne({ phone })
      if(student) {
        return res.status(STATUS.UNAUTHORIZED).json({
          success: false,
          message: req.t("auth.alreadyExist")
        })
      }
      next()
    }
    if(userRole === "teacher") {
      const { phone } = teacherSchema.parse(userData)
      const teacher = await TeacherModel.findOne({ phone })
      if(teacher) {
        return res.status(STATUS.UNAUTHORIZED).json({
          success: false,
          message: req.t("auth.alreadyExist")
        })
      }
      next()
    }
    return res.status(STATUS.BAD_REQUEST).json({
      message: req.t("common.wrongParams"),
      success: false
    })
  } catch(error) {
    if (error instanceof ZodError) {
      return res.status(STATUS.UNPROCESSABLE_ENTITY).json({
        success: false,
        errors: zodErrorFormatter(error, req.t)
      });
    }
    
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: req.t("common.internalServerError")
    });
  }
}
