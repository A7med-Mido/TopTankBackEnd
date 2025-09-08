import TeacherModel from "../configs/models/TeacherSchema";
import { TeacherInput, teacherSchema } from "../types/zodValidation";
import { encrypt, hashPassword } from "../utils/encryption";


const teacherRegistration = async (userData: TeacherInput) => {
  try {
    const teacherData = teacherSchema.parse(userData)
    teacherData.password = hashPassword(userData.password)
    const { password, phone, user } = teacherData
    const token = encrypt({ phone, password, user })
    delete teacherData.user
    await TeacherModel.create(teacherData)
    return token
  } catch (error) {
    console.log(error)
    throw error
  }
}


export default teacherRegistration