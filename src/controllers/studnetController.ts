import { Request, Response } from "express";
import StudentModel from "../configs/models/StudentSchema";
import { decrypt } from "../auth/encryption";


export const getStudentData = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization as string).split(" ")[1];
    const { id } = decrypt(token);
    const student = await StudentModel.findByIdAndDelete(id);

    return res.json({
      success: true,
      student
    })
  } catch(error) {
    return res.json({
      message: "Internal code Error",
      success: false
    })
  }
}
