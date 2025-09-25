import { Request, Response } from "express";
import StudentModel from "../configs/models/StudentSchema";
import { decrypt } from "../auth/encryption";
import { writeImageFile } from "../utils/optImage";
import { UploadedFile } from "express-fileupload";

export const getStudentData = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization as string).split(" ")[1];
    const { id } = decrypt(token);
    const student = await StudentModel.findById(id).select("-password -");

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
    const token = (req.headers.authorization as string)?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image file uploaded", success: false });
    }

    const image = req.files.image as UploadedFile;

    const { id } = decrypt(token);

    const imageUrl = await writeImageFile({ id, imageFile: image.data });

    await StudentModel.findByIdAndUpdate(
      id,
      { image: imageUrl },
      { new: true }
    );

    return res.status(200).json({
      message: "Image uploaded successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
