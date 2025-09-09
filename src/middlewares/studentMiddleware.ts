import StudentModel from "../configs/models/StudentSchema"
import { decrypt } from "../auth/encryption"
import { Request, Response, NextFunction } from "express"
import { studentSchema } from "./zodValidators"


export const isStudentMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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
    const student = await StudentModel.find({ id, phone })
    if(!student) return res.status(401).json({ message: "This user is not authenticated" })
    next()
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}


export const studentAlreadyRegisteredMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Request body is empty or undefined"
    });
  }

  try {
    const userData = req.body
    const { phone,  } = studentSchema.parse(userData)

  } catch(error) {
    
  }
}