import { Request, Response } from "express"
import { encrypt, hashPassword, verifyPassword } from "../auth/encryption"
import TeacherModel from "../configs/models/TeacherSchema"
import { decrypt } from "../auth/encryption"
import StudentModel from "../configs/models/StudentSchema"
import { ZodError } from "zod"
import { invalidFields, studentSchema, teacherSchema } from "../middlewares/zodValidators"


// teacher registration
export const teacherRegister = async (req: Request, res: Response) => {
  try {
    const teacherData = req.body

    const userRole = teacherData.user
    delete teacherData.user
    teacherData.password = await hashPassword(teacherData.password)
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
// Teacher login
export const teacherLogin = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const { password, phone, username } = teacherSchema.parse(userData);
    const teacher = await TeacherModel.findOne({
      $or: [
        { phone: phone }
      ]
    })
    if(!teacher) {
      return res.status(401).json({
        message: "No such user with this phone number.",
        success: false
      })
    }
    if(teacher.username !== username) {
      return res.status(401).json({
        message: "Wrong username.",
        success: false
      })
    }
    if(!await verifyPassword({ password, storedHash: teacher.password })) {
      return res.status(401).json({
        message: "Wrong password.",
        success: false
      })
    }
    const token = encrypt({ phone: teacher.phone, user: "teacher", id: teacher._id.toString() })

    res.status(201).json({
      message: "You have logged in successfully.",
      success: true,
      token
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(422).json({
        success: false,
        errors: invalidFields(error)
      });
    }
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
// delete teacher
export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization as string).split(" ")[1];
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
    studentData.password = await hashPassword(studentData.password)
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
// Student login
export const studentLogin = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const { password, phone } = studentSchema.parse(userData);
    const student = await StudentModel.findOne({
      $or: [
        { phone: phone }
      ]
    })
    console.log(student)
    if(!student) {
      return res.status(401).json({
        message: "No such user with this phone number.",
        success: false
      })
    }
    if(!await verifyPassword({ password, storedHash: student.password})) {
      return res.status(401).json({
        message: "Wrong password.",
        success: false
      })
    }
    const token = encrypt({ phone: student.phone, user: "student", id: student._id.toString() })

    res.status(201).json({
      message: "You have logged in successfully.",
      success: true,
      token
    })
  } catch (error) {
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

// delete Student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization as string).split(" ")[1];
    const { id } = decrypt(token);
    const student = await StudentModel.findByIdAndDelete(id);


    if(!student) {
      return res.status(400).json({
        message: "This user doesn't exist anymore.",
        success: false
      });
    }
    return res.status(200).json({
      message: "Your account has deleted successfully.",
      success: true
    });
  } catch(error) {
    return res.status(500).json({
      message: "Internal server Error.",
      success: false
    })
  }
}