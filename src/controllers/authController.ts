import { Request, Response } from "express"
import { encrypt, hashPassword, verifyPassword } from "../auth/encryption"
import TeacherModel from "../configs/models/TeacherSchema"
import { decrypt } from "../auth/encryption"
import StudentModel from "../configs/models/StudentSchema"
import { ZodError } from "zod"
import { invalidFields, studentSchema, teacherSchema } from "../middlewares/zodValidators"
import { HTTP_STATUS } from "../utils/constants/http-status"



// User Registration
export const userRegister = async(req: Request, res: Response) => {
  try {
    const userData = req.body
    const { userRole } = req.params
    if( userRole === "student" ) {
      studentSchema.parse(userData);
      userData.password = await hashPassword(userData.password)
      const { _id } = await StudentModel.create(userData)
      const token = encrypt({ phone: userData.phone, id: _id.toString(), user: userRole })
  
      res.status(201).json({
        message: "You have registered successfully.",
        success: true,
        token
      })
    }
    if( userRole === "teacher" ) {
      teacherSchema.parse(userData);
      userData.password = await hashPassword(userData.password)
      const { _id } = await TeacherModel.create(userData)
      const token = encrypt({ phone: userData.phone, id: _id.toString(), user: userRole })
  
      res.status(201).json({
        message: "You have registered successfully.",
        success: true,
        token
      })
    }
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "You might hit the wrong URL.",
      success: false
    })

  } catch(error) {
    // Handle other Server errors
    res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
}
// User Login
export const userLogin = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const { userRole } = req.params

    if( userRole === "student" ) {
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
      const token = encrypt({ phone: student.phone, user: userRole, id: student._id.toString() })

      res.status(201).json({
        message: "You have logged in successfully.",
        success: true,
        token
      })
    }
    if( userRole === "teacher" ) {
      const { password, phone } = studentSchema.parse(userData);
      const teacher = await TeacherModel.findOne({
        $or: [
          { phone: phone }
        ]
      })
      console.log(teacher)
      if(!teacher) {
        return res.status(401).json({
          message: "No such user with this phone number.",
          success: false
        })
      }
      if(!await verifyPassword({ password, storedHash: teacher.password})) {
        return res.status(401).json({
          message: "Wrong password.",
          success: false
        })
      }
      const token = encrypt({ phone: teacher.phone, user: userRole, id: teacher._id.toString() })

      res.status(201).json({
        message: "You have logged in successfully.",
        success: true,
        token
      })
    }
  
  
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
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization as string).split(" ")[1];
    const { id, user } = decrypt(token);
    if(user === "student") {
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
    }
    if( user === "teacher") {
      const teacher = await TeacherModel.findByIdAndDelete(id);
      if(!teacher) {
        return res.status(400).json({
          message: "This user doesn't exist anymore.",
          success: false
        });
      }
      return res.status(200).json({
        message: "Your account has deleted successfully.",
        success: true
      });
    }
  } catch(error) {
    return res.status(500).json({
      message: "Internal server Error.",
      success: false
    })
  }
}