import TeacherModel from "../configs/models/TeacherSchema";
import { TeacherInput, teacherSchema } from "../types/zodValidation";
import { encrypt, hashPassword } from "../utils/encryption";


const teacherRegistration = async (userData: TeacherInput) => {
  try {
    const teacherData = teacherSchema.parse(userData)
    teacherData.password = hashPassword(userData.password)
    await TeacherModel.create(teacherData)
    const { password, phone } = teacherData
    const token = encrypt({ phone, password })
    return token
  } catch (error) {
    console.log(error)
    throw error
  }
}


export default teacherRegistration