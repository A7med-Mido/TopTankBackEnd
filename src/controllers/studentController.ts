import { Request, Response } from "express";
import StudentModel from "../configs/models/StudentSchema";
import { decrypt } from "../auth/encryption";
import { writeImageFile } from "../utils/optImage";


export const getStudentData = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization as string).split(" ")[1];
    const { id } = decrypt(token);
    const student = await StudentModel.findById(id).select("-password");

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

export const postStudentProfilePicture = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization as string).split(" ")[1];
    const file = req.files as any
    console.log(file)
    const { id } = decrypt(token);
    const imageUrl = await writeImageFile({ id, imageFile: file})
    await StudentModel.findByIdAndUpdate(
      id, {
        image: imageUrl
      },
      { new: true }
    );
    
    return res.status(200).json({
      message: "Image uploaded successfully",
      success: true
    })
  } catch(error) {
    console.log(error)
    return res.status(400).json({
      message: "internal server error",
      success: false
    })
  }
}