import { Request, Response } from "express"
import { encrypt, hashPassword } from "../auth/encryption"
import { invalidFields, studentSchema, teacherSchema } from "../middlewares/zodValidators"
import { ZodError } from "zod"
import TeacherModel from "../configs/models/TeacherSchema"

// teacher registration
export const teacherRegister = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const teacherData = teacherSchema.parse(userData)

    const userRole = teacherData.user
    delete teacherData.user
    teacherData.password = hashPassword(teacherData.password)
    const { _id } = await TeacherModel.create(teacherData)
    const token = encrypt({ phone: teacherData.phone, id: _id.toString(), user: userRole })
    console.log(_id.toString());

    res.status(201).json({
      message: "You have registered successfully",
      success: true,
      token
    })

  } catch(error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        errors: invalidFields(error)
      });
    }
    
    // Handle other errors
    console.error("Unexpected error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// student registration
export const studentRegister = async(req: Request, res: Response) => {
  try {
    const userData = req.body
    const studentData = studentSchema.parse(userData)

    const userRole = studentData.user
    delete studentData.user
    studentData.password = hashPassword(studentData.password)
    const { _id } = await TeacherModel.create(studentData)
    const token = encrypt({ phone: studentData.phone, id: _id.toString(), user: userRole })
    console.log(_id.toString());

    res.status(201).json({
      message: "You have registered successfully",
      success: true,
      token
    })

  } catch(error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        errors: invalidFields(error)
      });
    }
    
    // Handle other errors
    console.error("Unexpected error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}