import { Request, Response } from "express"
import StudentModel from "../database/models/Student.model";
import { STATUS } from "../utils/constants/http-status";
import { removeImageFile, writeImageFile } from "../utils/fs/fs";
import { UploadedFile } from "express-fileupload";


export const getStudentData = async (req: Request, res: Response) => {
  try {
    const { id } = req.user
    const student = await StudentModel.findById(id).select("-password -otp -phone -_id -CreatedAt -UpdatedAt");
    if(!student) {
      return res.status(STATUS.NOT_FOUND).json({
        message: req.t("user.noUserAnymore"),
        success: false
      })
    }
    return res.status(STATUS.OK).json({
      student,
      success: true
    })
  } catch(error) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false
    })
  }
}


export const postStudentProfilePicture = async (req: Request, res: Response) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: req.t("common.noFileImageUploaded"),
        success: false
      });
    }
    const imageData = (req.files.image as UploadedFile).data

    const { id } = req.user
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
  } catch(error) {
    
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false,
    });
  } 
}

