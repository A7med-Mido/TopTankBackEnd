import StudentModel from "../configs/models/StudentSchema"
import { decrypt } from "../utils/encryption"
import { Request, Response, NextFunction } from "express"


const isTeacherMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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
    const { password, phone } = decrypt(token);
    const student = await StudentModel.find({ password, phone })
    if(!student) return res.status(401).json({ message: "This user is not authenticated" })
    next()
  } catch (error) {
    return res.status(404).json({
      error: error
    })
  }
}

export default isTeacherMiddleware