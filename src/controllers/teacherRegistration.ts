import TeacherModel from "../configs/models/TeacherShema";
import { TeacherInput, teacherSchema } from "../types/zodValidation";


const teacherRegistration = async (userData: TeacherInput) => {
  try {
    const teacherData = teacherSchema.parse(userData)
    const teacher = await TeacherModel.create(teacherData)
    return teacher
  } catch (error) {
    console.log(error)
    throw error
  }
}


export default teacherRegistration