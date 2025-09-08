import TeacherModel from "../configs/models/TeacherSchema";
import { TeacherInput, teacherSchema } from "../types/zodValidation";
import { encrypt, hashPassword } from "../utils/encryption";


const teacherRegistration = async (userData: TeacherInput) => {
  try {
    // validate Teacher data
    const teacherData = teacherSchema.parse(userData)
    // hashing password
    teacherData.password = hashPassword(userData.password)
    // encrypting Teacher data
    const { password, phone, user } = teacherData
    const token = encrypt({ phone, password, user })
    // delete userRole before saving to database
    delete teacherData.user
    await TeacherModel.create(teacherData)
    // return token to store in the client
    return token
  } catch (error) {
    console.log(error)
    throw error
  }
}


export default teacherRegistration