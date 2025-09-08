import TeacherModel from "../configs/models/TeacherSchema";
import { TeacherInput, teacherSchema } from "../types/zodValidation";
import { encrypt, hashPassword } from "../auth/encryption";


const teacherRegistration = async (userData: TeacherInput) => {
  try {
    // validate Teacher data
    const teacherData = teacherSchema.parse(userData)
    // hashing password
    teacherData.password = hashPassword(userData.password)
    const { phone, user } = teacherData
    // delete userRole before saving to database
    delete teacherData.user
    const { _id } = await TeacherModel.create(teacherData)
    // encrypting Teacher data
    const token = encrypt({ id: _id.toString(), phone, user })
    // return token to store in the client
    return token
  } catch (error) {
    console.log(error)
    throw error
  }
}


export default teacherRegistration