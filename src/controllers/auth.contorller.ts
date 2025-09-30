import { Request, Response } from "express"
import { hashPassword, verifyPassword } from "../utils/helpers/pass.helper"
import { encrypt } from "../utils/helpers/jwt.helper"
import { JWTPayload } from "../types/auth.types"
import TeacherModel from "../configs/models/Teacher.model"
import StudentModel from "../configs/models/Student.model"
import { ZodError } from "zod"
import { zodErrorFormatter, studentSchema, teacherSchema } from "../middlewares/zod.validator"
import { STATUS } from "../utils/constants/http-status"

// User Registration
export const userRegister = async(req: Request, res: Response) => {
  try {
    const userData = req.body
    const { userRole } = req.params

    if( userRole === "student" ) {
      studentSchema.parse(userData);
      userData.password = await hashPassword(userData.password)
      const { _id } = await StudentModel.create(userData)
      const token = encrypt({ phone: userData.phone, id: _id.toString(), userRole })
  
      res.status(STATUS.CREATED).json({
        message: req.t("auth.registered"),
        success: true,
        token
      })
    }
    if( userRole === "teacher" ) {
      teacherSchema.parse(userData);
      userData.password = await hashPassword(userData.password)
      const { _id } = await TeacherModel.create(userData)
      const token = encrypt({ phone: userData.phone, id: _id.toString(),  userRole })
  
      res.status(STATUS.CREATED).json({
        message: req.t("auth.registered"),
        success: true,
        token
      })
    }
    return res.status(STATUS.BAD_REQUEST).json({
      message: req.t("common.wrongParams"),
      success: false
    })

  } catch(error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: req.t("common.internalServerError")
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
      if(!student) {
        return res.status(STATUS.UNAUTHORIZED).json({
          message: "No such user with this phone number.",
          success: false
        })
      }
      if(!await verifyPassword({ password, storedHash: student.password})) {
        return res.status(STATUS.UNAUTHORIZED).json({
          message: "Wrong password.",
          success: false
        })
      }
      const token = encrypt({ phone: student.phone, id: student._id.toString(), userRole })

      res.status(STATUS.CREATED).json({
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
      if(!teacher) {
        return res.status(STATUS.UNAUTHORIZED).json({
          message: "No such user with this phone number.",
          success: false
        })
      }
      if(!await verifyPassword({ password, storedHash: teacher.password})) {
        return res.status(STATUS.UNAUTHORIZED).json({
          message: "Wrong password.",
          success: false
        })
      }
      const token = encrypt({ phone: teacher.phone, id: teacher._id.toString(), userRole, })

      res.status(STATUS.CREATED).json({
        message: "You have logged in successfully.",
        success: true,
        token
      })
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(STATUS.UNPROCESSABLE_ENTITY).json({
        success: false,
        errors: zodErrorFormatter(error, req.t)
      });
    }
    
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// delete Student
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id, userRole } = (req as any).user as JWTPayload
    if(userRole === "student") {
      const student = await StudentModel.findByIdAndDelete(id);
      if(!student) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "This user doesn't exist anymore.",
          success: false
        });
      }
      return res.status(STATUS.OK).json({
        message: "Your account has deleted successfully.",
        success: true
      });
    }
    if(userRole === "teacher") {
      const teacher = await TeacherModel.findByIdAndDelete(id);
      if(!teacher) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "This user doesn't exist anymore.",
          success: false
        });
      }
      return res.status(STATUS.OK).json({
        message: "Your account has deleted successfully.",
        success: true
      });
    }
  } catch(error) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Internal server Error.",
      success: false
    })
  }
}