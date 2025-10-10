import { StudentInput } from "../zod/zod.validator";
import StudentModel from "../database/models/Student.model";


export const queryStudentData = async ({
  id,
  property,
}:{
  id: string,
  property: "all" | "phone" | "image" | "otp"
}): Promise<StudentInput | null> => {
  try {
    const student = await StudentModel
    .findById(id)
    .select(
      property === "all"?
      `-password ${property} -otp -_id -CreatedAt -UpdatedAt`:
      `-password ${property} -_id -CreatedAt -UpdatedAt`
    )

    if(!student) return null

    return student
  } catch(error) {
    throw error
  }
}