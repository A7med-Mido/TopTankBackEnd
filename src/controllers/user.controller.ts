import { Request, Response } from "express";
import StudentModel from "../configs/models/Student.model";
import { removeImageFile, writeImageFile } from "../utils/fs/fs";
import { UploadedFile } from "express-fileupload";
import TeacherModel from "../configs/models/Teacher.model";
import { STATUS } from "../utils/constants/http-status";

export const getUserData = async (req: Request, res: Response) => {
  try {
    const { id, userRole } = req.user

    if(userRole === "student") {
      const student = await StudentModel.findById(id).select("-password -otp -phone -_id -CreatedAt -UpdatedAt");
      return res.status(STATUS.OK).json({
        student,
        success: true
      })
    }

    if(userRole === "teacher") {
      const teacher = await TeacherModel.findById(id).select("-password -otp -phone -_id -CreatedAt -UpdatedAt");
      return res.status(STATUS.OK).json({
        teacher,
        success: true
      })
    }

    return res.status(STATUS.BAD_REQUEST).json({
      message: req.t("common.wrongParams"),
      success: false
    })
  } catch(error) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false
    })
  }
}


export const postUserProfilePicture = async (req: Request, res: Response) => {
  try {
    const { id, userRole } = req.user

    if (!req.files || !req.files.image) {
      return res.status(STATUS.BAD_REQUEST).json({ message: req.t("common.noFileImageUploaded"), success: false });
    }
    const imageData = (req.files.image as UploadedFile).data

    if(userRole === "student") {
    
      const { image } = await StudentModel.findById(id).orFail();
      if(image) {
        const isRemoved = await removeImageFile(image)
        
        if(!isRemoved) {
          return res.status(STATUS.NOT_FOUND).json({
            message: req.t("common.fileNotInServer"),
            success: false
          })
        }
      }
      
      const imageUrl = await writeImageFile({ id, imageFile: imageData });
      
      await StudentModel.findByIdAndUpdate(
        id,
        { image: imageUrl },
        { new: true }
      );

      return res.status(STATUS.OK).json({
        message: req.t("user.imageUploaded"),
        success: true,
      });
    }
    if(userRole === "teacher") {
    
      const { image } = await TeacherModel.findById(id).orFail();
      if(image) {
        const isRemoved = await removeImageFile(image)
        
        if(!isRemoved) {
          return res.status(STATUS.NOT_FOUND).json({
            message: req.t("common.fileNotInServer"),
            success: false
          })
        }
      }

      
      const imageUrl = await writeImageFile({ id, imageFile: imageData });
      
      await TeacherModel.findByIdAndUpdate(
        id,
        { image: imageUrl },
        { new: true }
      );

      return res.status(STATUS.OK).json({
        message: req.t("user.imageUploaded"),
        success: true,
      });
    }

  } catch (error) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false,
    });
  }
};


