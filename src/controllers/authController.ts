import { Request, Response } from "express"
import { encrypt, hashPassword } from "../auth/encryption"
import TeacherModel from "../configs/models/TeacherSchema"
import { decrypt } from "../auth/encryption"
import StudentModel from "../configs/models/StudentSchema"


// teacher registration
export const teacherRegister = async (req: Request, res: Response) => {
  try {
    const teacherData = req.body

    const userRole = teacherData.user
    delete teacherData.user
    teacherData.password = hashPassword(teacherData.password)
    const { _id } = await TeacherModel.create(teacherData)
    const token = encrypt({ phone: teacherData.phone, id: _id.toString(), user: userRole })
    res.status(201).json({
      message: "You have registered successfully",
      success: true,
      token
    })

  } catch(error) {
    // Handle other errors
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
// delete teacher
export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization as string).split(" ")[1]
    const { id } = decrypt(token)
    const teacher = await TeacherModel.findByIdAndDelete(id)
    if(!teacher) {
      return res.status(400).json({
        message: "This user doesn't exist anymore.",
        success: false
      })
    }
    return res.status(200).json({
      message: "Your account has deleted successfully.",
      success: true
    })
  } catch(error) {
    return res.status(500).json({
      message: "Internal server Error",
      success: false
    })
  }
}




// student registration
export const studentRegister = async(req: Request, res: Response) => {
  try {
    const studentData = req.body

    const userRole = studentData.user
    delete studentData.user
    studentData.password = hashPassword(studentData.password)
    const { _id } = await StudentModel.create(studentData)
    const token = encrypt({ phone: studentData.phone, id: _id.toString(), user: userRole })

    res.status(201).json({
      message: "You have registered successfully",
      success: true,
      token
    })

  } catch(error) {
    // Handle other Server errors
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// delete Student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization as string).split(" ")[1]
    const { id } = decrypt(token)
    const student = await StudentModel.findByIdAndDelete(id)
    if(!student) {
      return res.status(400).json({
        message: "This user doesn't exist anymore.",
        success: false
      })
    }
    return res.status(200).json({
      message: "Your account has deleted successfully.",
      success: true
    })
  } catch(error) {
    return res.status(500).json({
      message: "Internal server Error.",
      success: false
    })
  }
}