import { decrypt } from "../auth/encryption"
import { Request, Response, NextFunction } from "express"
import TeacherModel from "../configs/models/TeacherSchema"
import { teacherSchema } from "./zodValidators"
import { ZodError } from "zod"
import { invalidFields } from "./zodValidators"
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"

export const isTeacherMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({
      message: "Auth header is missing"
    })
  }
  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  if(!token) {
    return res.status(401).json({
      message: "Missing JWT"
    })
  }
  try {
    const { id, phone } = decrypt(token);
    const teacher = await TeacherModel.find({ id, phone })
    if(!teacher) {
      return res.status(401).json({
        message: "This user is not authenticated",
        success: false
      })
    }
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        message: "The token has expired",
        success: false
      })

    }
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({
        message: error.message,
        success: false
      })
    }
    return res.status(500).json({
      message: "Internal server error",
      success: false
    })
  }
}

export const isTeacherAlreadyExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Request body is empty or undefined"
    });
  }

  try {
    const userData = req.body
    const { phone } = teacherSchema.parse(userData)

    const teacher = await TeacherModel.findOne({ phone })
    if(teacher) {
      return res.status(401).json({
        success: false,
        message: "This user already exist."
      })
    }
    next()
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