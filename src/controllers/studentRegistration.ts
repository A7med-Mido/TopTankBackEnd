import StudentModel from "../configs/models/StudentSchema";
import { StudentInput, studentSchema } from "../types/zodValidation";
import { encrypt, hashPassword } from "../utils/encryption";


const studentRegistration = async (userData: StudentInput) => {
  try {
    // validate Student data
    const studentData = studentSchema.parse(userData)
    // hashing password
    studentData.password = hashPassword(userData.password)
    // encrypting student data
    const { password, phone, user} = studentData
    const token = encrypt({ password, phone, user })
    // delete userRole before saving to database
    delete studentData.user
    await StudentModel.create(studentData)
    // return token to store in the client
    return token
  } catch (error) {
    console.log(error)
    throw error
  }
}


export default studentRegistration