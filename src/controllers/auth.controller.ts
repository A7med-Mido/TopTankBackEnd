import { Request, Response } from "express"
import { hashPassword, verifyPassword } from "../utils/helpers/pass.helper"
import { encrypt } from "../utils/helpers/jwt.helper"
import TeacherModel from "../database/models/Teacher.model"
import StudentModel from "../database/models/Student.model"
import { UserRole, StudentInput, TeacherInput } from "../zod/zod.validator"
import { STATUS } from "../utils/constants/http-status"

// User Registration
export const userRegister = (userRole: UserRole) => {
  return async (req: Request, res: Response) => {
    try {
      const userData = req.body

      if( userRole === "student" ) {
        userData.password = await hashPassword(userData.password)
        const { _id } = await StudentModel.create(userData)
        const token = encrypt({ phone: userData.phone, id: String(_id), userRole })
    
        return res.status(STATUS.CREATED).json({
          message: req.t("auth.registered"),
          success: true,
          token
        })
      }
      if( userRole === "teacher" ) {
        userData.password = await hashPassword(userData.password)
        const { _id } = await TeacherModel.create(userData)
        const token = encrypt({ phone: userData.phone, id: String(_id),  userRole })
    
        return res.status(STATUS.CREATED).json({
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
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: req.t("common.internalServerError")
      });
    }
  }
}
// User Login
export const userLogin = (userRole: UserRole) => {
  return async (req: Request, res: Response) => {
    try {
      const userData = req.body
  
      if( userRole === "student" ) {
        const { phone, password } = userData as StudentInput
        const student = await StudentModel.findOne({
          $or: [
            { phone: phone }
          ]
        })
        if(!student) {
          return res.status(STATUS.UNAUTHORIZED).json({
            message: req.t("user.notFoundByPhoneNumber"),
            success: false
          })
        }
        if(!await verifyPassword({ password, storedHash: student.password})) {
          return res.status(STATUS.UNAUTHORIZED).json({
            message: req.t("validation.wrongPassword"),
            success: false
          })
        }
  
        const token = encrypt({ phone: student.phone, id: String(student._id), userRole })
  
        return res.status(STATUS.CREATED).json({
          message: req.t("auth.loggedIn"),
          success: true,
          token
        })
      }
      if( userRole === "teacher" ) {
        const { password, phone } = userData as TeacherInput
        const teacher = await TeacherModel.findOne({
          $or: [
            { phone: phone }
          ]
        })
        if(!teacher) {
          return res.status(STATUS.UNAUTHORIZED).json({
            message: req.t("user.notFoundByPhoneNumber"),
            success: false
          })
        }
        if(!await verifyPassword({ password, storedHash: teacher.password})) {
          return res.status(STATUS.UNAUTHORIZED).json({
            message: req.t("validation.wrongPassword"),
            success: false
          })
        }
        const token = encrypt({ phone: teacher.phone, id: String(teacher._id), userRole })
  
        return res.status(STATUS.CREATED).json({
          message: req.t("auth.loggedIn"),
          success: true,
          token
        })
      }
    } catch (error) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: req.t("common.internalServerError")
      });
    }
  }
}

// delete Student
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id, userRole } = req.user
    
    if(userRole === "student") {
      const student = await StudentModel.findByIdAndDelete(id);
      if(!student) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: req.t("user.noUserAnymore"),
          success: false
        });
      }
      return res.status(STATUS.OK).json({
        message: req.t("user.deleted"),
        success: true
      });
    }
    if(userRole === "teacher") {
      const teacher = await TeacherModel.findByIdAndDelete(id);
      if(!teacher) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: req.t("user.noUserAnymore"),
          success: false
        });
      }
      return res.status(STATUS.OK).json({
        message: req.t("user.deleted"),
        success: true
      });
    }
  } catch(error) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false
    })
  }
}