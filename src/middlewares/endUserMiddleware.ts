import StudentModel from "../configs/models/StudentSchema"
import TeacherModel from "../configs/models/TeacherSchema"
import { decrypt } from "../auth/encryption"
import { Request, Response, NextFunction } from "express"
import { studentSchema, teacherSchema } from "./zodValidators"
import { ZodError } from "zod"
import { invalidFields } from "./zodValidators"
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken"
import { HTTP_STATUS } from "../utils/constants/http-status"

export const isEndUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: "Auth header is missing.",
      success: false
    })
  }
  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  if(!token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: "Missing JWT.",
      success: false
    })
  }
  try {
    const { id, phone, user } = decrypt(token);

    if(user === "student") {
      // query from the db for fast development testing
      const student = await StudentModel.find({ id, phone })
      if(!student) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
          message: "This user is not authenticated.",
          success: false
        })
      }
    }
    if(user === "teacher") {
      // query from the db for fast development testing
      const teacher = await TeacherModel.find({ id, phone })
      if(!teacher) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
          message: "This user is not authenticated.",
          success: false
        })
      }
    }
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: "The token has expired.",
        success: false
      })
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: error.message,
        success: false
      })
    }
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error.",
      success: false
    })
  }
}

export const isEndUserExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body
    const { userRole } = req.params
    
    if(userRole === "student") {
      const { phone } = studentSchema.parse(userData)
      const student = await StudentModel.findOne({ phone })
      if(student) {
        return res.status(401).json({
          success: false,
          message: "This user already exist."
        })
      }
      next()
    }
    if(userRole === "teacher") {
      const { phone } = teacherSchema.parse(userData)
      const teacher = await TeacherModel.findOne({ phone })
      if(teacher) {
        return res.status(401).json({
          success: false,
          message: "This user already exist."
        })
      }
      next()
    }
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "",
      success: false
    })
  } catch(error) {
    if (error instanceof ZodError) {
      return res.status(422).json({
        success: false,
        errors: invalidFields(error)
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
