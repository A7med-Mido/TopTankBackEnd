import { Request, Response } from "express";
import StudentModel from "../configs/models/Student.model";
import { decrypt } from "../utils/helpers/jwt.helper";
import { removeImageFile, writeImageFile } from "../utils/fs";
import { UploadedFile } from "express-fileupload";
import { JWTPayload } from "../types/auth.types";

export const getStudentData = async (req: Request, res: Response) => {
  try {
    const { id, userRole } = (req as any).user as JWTPayload
    const student = await StudentModel.findById(id).select("-password -otp -phone -_id -CreatedAt -UpdatedAt");

    return res.status(200).json({
      student,
      success: true
    })
  } catch(error) {
    return res.status(500).json({
      message: "Internal code Error.",
      success: false
    })
  }
}


export const postStudentProfilePicture = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization as string)?.split(" ")[1];

    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image file uploaded.", success: false });
    }

    const imageData = (req.files.image as UploadedFile).data

    const { id } = decrypt(token);
    
    const { image } = await StudentModel.findById(id)
    const isRemoved = await removeImageFile(image)
    
    console.log(isRemoved)
    if(!isRemoved) {
      return res.status(404).json({
        message: "The file doesn't exists.",
        success: false
      })
    }
    
    const imageUrl = await writeImageFile({ id, imageFile: imageData });
    
    await StudentModel.findByIdAndUpdate(
      id,
      { image: imageUrl },
      { new: true }
    );

    return res.status(200).json({
      message: "Image uploaded successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const subNewCourse = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization as string)?.split(" ")[1];
    const { id } = decrypt(token);
    const { sub } = req.params



    res.status(200).json({
      message: "Subscribed successfully.",

    })
  } catch(error) {
    return res.status(500).json({
      message: "internal server error.",
      success: false
    })
  }
}

