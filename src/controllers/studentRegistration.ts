import StudentModel from "../configs/models/StudentSchema";
import { StudentInput, studentSchema } from "../types/zodValidation";
import { encrypt, hashPassword } from "../utils/encryption";


const studentRegistration = async (userData: StudentInput) => {
  try {
    const studentData = studentSchema.parse(userData)
    studentData.password = hashPassword(userData.password)
    await StudentModel.create(studentData)
    const { password, phone } = studentData
    const token = encrypt({ password, phone })
    return token
  } catch (error) {
    console.log(error)
    throw error
  }
}


export default studentRegistration