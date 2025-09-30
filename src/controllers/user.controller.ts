import { Request, Response } from "express";
import StudentModel from "../configs/models/Student.model";
import { decrypt } from "../utils/helpers/jwt.helper";
import { removeImageFile, writeImageFile } from "../utils/fs/fs";
import { UploadedFile } from "express-fileupload";
import { JWTPayload } from "../types/auth.types";
import TeacherModel from "../configs/models/Teacher.model";
import { HTTP_STATUS } from "../utils/constants/http-status";

export const getUserData = async (req: Request, res: Response) => {
  try {
    const { id, userRole } = (req as any).user as JWTPayload

    if(userRole === "student") {
      const student = await StudentModel.findById(id).select("-password -otp -phone -_id -CreatedAt -UpdatedAt");
      return res.status(HTTP_STATUS.OK).json({
        student,
        success: true
      })
    }

    if(userRole === "teacher") {
      const teacher = await TeacherModel.findById(id).select("-password -otp -phone -_id -CreatedAt -UpdatedAt");
      return res.status(HTTP_STATUS.OK).json({
        teacher,
        success: true
      })
    }

    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Wrong URL.",
      success: false
    })
  } catch(error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Internal code Error.",
      success: false
    })
  }
}


export const postUserProfilePicture = async (req: Request, res: Response) => {
  try {
    const { id, userRole } = (req as any).user as JWTPayload

    if (!req.files || !req.files.image) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "No image file uploaded.", success: false });
    }
    const imageData = (req.files.image as UploadedFile).data

    if(userRole === "student") {
    
      const { image } = await StudentModel.findById(id)
      const isRemoved = await removeImageFile(image)
      
      if(!isRemoved) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
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

      return res.status(HTTP_STATUS.OK).json({
        message: "Image uploaded successfully.",
        success: true,
      });
    }
    if(userRole === "teacher") {
    
      const { image } = await TeacherModel.findById(id)
      const isRemoved = await removeImageFile(image)
      
      if(!isRemoved) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          message: "The file doesn't exists.",
          success: false
        })
      }
      
      const imageUrl = await writeImageFile({ id, imageFile: imageData });
      
      await TeacherModel.findByIdAndUpdate(
        id,
        { image: imageUrl },
        { new: true }
      );

      return res.status(HTTP_STATUS.OK).json({
        message: "Image uploaded successfully.",
        success: true,
      });
    }

  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const subNewCourse = async (req: Request, res: Response) => {
  try {
    const { id, userRole } = (req as any).user as JWTPayload


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

