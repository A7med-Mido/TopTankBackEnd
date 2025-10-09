import StudentModel from "../database/models/Student.model"
import TeacherModel from "../database/models/Teacher.model"
import { StudentInput, TeacherInput, UserRole } from "../zod/zod.validator"
import { hashPassword } from "../utils/helpers/pass.helper"
import { encrypt } from "../utils/helpers/jwt.helper"
import { verifyPassword } from "../utils/helpers/pass.helper"

// User Register
export const createUser = async (
  role: UserRole,
  userData: StudentInput | TeacherInput
) => {
  try {
    switch (role) {
      case "student": {
        userData.password = await hashPassword(userData.password)
        const { _id } = await StudentModel.create(userData)
        const token = encrypt({ phone: userData.phone, id: String(_id), userRole: role })
        return token
      }
      case "teacher": {
        userData.password = await hashPassword(userData.password)
        const { _id } = await TeacherModel.create(userData)
        const token = encrypt({ phone: userData.phone, id: String(_id), userRole: role })
        return token
      }
      default: return null
    }
  } catch(error) {
    throw error
  }
}

// User Login
export const loginUser = async (
  role: UserRole,
  userData: StudentInput | TeacherInput
): Promise<null | string | undefined> => {
  try {
    switch (role) {
      case "student": {
        const { phone, password } = userData as StudentInput
        const student = await StudentModel.findOne({
          $or: [
            { phone: phone }
          ]
        })
        if(!student) return null
        if(!await verifyPassword({ password, storedHash: student.password})) return null

        return encrypt({ phone: student.phone, id: String(student._id), userRole: role })
      }
      case "teacher": {
        const { phone, password } = userData as TeacherInput
        const teacher = await TeacherModel.findOne({
          $or: [
            { phone: phone }
          ]
        })
        if(!teacher) return null
        if(!await verifyPassword({ password, storedHash: teacher.password})) return null

        return encrypt({ phone: teacher.phone, id: String(teacher._id), userRole: role })
      }
      default: return undefined
    }
  } catch(error) {
    throw error
  }
}




export const deleteUserById = async (
  role: UserRole,
  id: string
): Promise<"userDoesNotExistAnymore" | null | true> => {
  try {
    switch (role) {
      case "student": {
        const student = await StudentModel.findByIdAndDelete(id);
        if(!student) return "userDoesNotExistAnymore"
        return true
      }
      case "teacher": {
        const teacher = await TeacherModel.findByIdAndDelete(id);
        if(!teacher) return "userDoesNotExistAnymore"
        return true
      }
      default: return null
    }
  } catch(error) {
    throw error
  }
}