import StudentModel from "../configs/models/StudentSchema";
import { StudentInput, studentSchema } from "../types/zodValidation";
import { encrypt, hashPassword } from "../auth/encryption";


const studentRegistration = async (userData: StudentInput) => {
  try {
    // validate Student data
    const studentData = studentSchema.parse(userData)
    // hashing password
    studentData.password = hashPassword(userData.password)
    const { phone, user } = studentData
    // delete userRole before saving to database
    delete studentData.user
    const { _id } = await StudentModel.create(studentData)
    // encrypting student data
    const token = encrypt({ id: _id.toString(), phone, user })
    // return token to store in the client
    return token
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default studentRegistration