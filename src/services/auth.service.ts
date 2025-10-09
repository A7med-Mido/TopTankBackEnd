import StudentModel from "../database/models/Student.model";
import TeacherModel from "../database/models/Teacher.model";
import { StudentInput, TeacherInput, UserRole } from "../zod/zod.validator";
import { hashPassword, verifyPassword } from "../utils/helpers/pass.helper";
import { encrypt } from "../utils/helpers/jwt.helper";

// Create User
export const createUser = async (
  role: UserRole,
  userData: StudentInput | TeacherInput
): Promise<string | null> => {
  try {
    userData.password = await hashPassword(userData.password);;

    if(role === "student") {
      const { _id, phone } = await StudentModel.create(userData);
      return encrypt({ phone, id: String(_id), userRole: role });
    }

    if(role === "teacher") {
      const { _id, phone } = await TeacherModel.create(userData);
      return encrypt({ phone, id: String(_id), userRole: role });
    }

    return null;
  } catch (error) {
    throw error;
  }
};

// Login User
export const loginUser = async (
  role: UserRole,
  userData: StudentInput | TeacherInput
): Promise<null | string | undefined> => {
  try {
    const { phone, password } = userData;

      if (role === "student") {
        const student = await StudentModel.findOne({ phone });
        if (!student) return null;

        const valid = await verifyPassword({ password, storedHash: student.password });
        if (!valid) return null;

        return encrypt({ phone: student.phone, id: String(student._id), userRole: role });
      }
      
      if(role === "teacher") {
        const teacher = await TeacherModel.findOne({ phone });
        if (!teacher) return null;

        const valid = await verifyPassword({ password, storedHash: teacher.password });
        if (!valid) return null;

        return encrypt({ phone: teacher.phone, id: String(teacher._id), userRole: role });
      }
      return undefined;
  } catch (error) {
    throw error;
  }
};

// Delete User
export const deleteUser = async (
  role: UserRole,
  id: string
): Promise<"userDoesNotExistAnymore" | null | true> => {
  try {

    if(role === "student") {
      const student = await StudentModel.findByIdAndDelete(id);
      return student ? true : "userDoesNotExistAnymore";
    }

    if(role === "teacher") {
      const teacher = await TeacherModel.findByIdAndDelete(id);
      return teacher ? true : "userDoesNotExistAnymore";
    }

    return null;
  } catch (error) {
    throw error;
  }
};
