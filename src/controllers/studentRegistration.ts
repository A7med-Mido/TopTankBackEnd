import StudentModel from "../configs/models/StudentSchema";
import { StudentInput, studentSchema } from "../types/zodValidation";


const studentRegistration = async (userData: StudentInput) => {
  try {
    const studentData = studentSchema.parse(userData)
    const student = await StudentModel.create(studentData)
    return student
  } catch (error) {
    console.log(error)
    throw error
  }
}


export default studentRegistration