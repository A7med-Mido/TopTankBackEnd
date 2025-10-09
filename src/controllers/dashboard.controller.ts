import { Request, Response } from "express";
import { STATUS } from "../utils/constants/http-status";
import { cloudFetchHook } from "../services/dashboard.service";
import CloudModel from "../database/models/Cloud.model";

// Getting All Clouds Info
export const getAllCloudsInfo = async (req: Request, res: Response) => {
  try {
    const clouds = await CloudModel.find({}).orFail();
    if(!clouds) {
      return res.status(STATUS.NOT_FOUND).json({
        message: req.t("dashboard.noCloudsExist"),
        success: false
      })
    }
    const data = clouds.map(async ({_id, ip}) => {
      return {
        id : String(_id),
        data: cloudFetchHook({ action: "get", path: "/state", ip})
      }
    })
    
    return res.status(STATUS.OK).json(data)
  } catch(error) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false
    })
  }
}

// Getting One Cloud Info
export const getOneCloudInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const cloud = await CloudModel.findById(id).orFail();
    if(!cloud) {
      return res.status(STATUS.NOT_FOUND).json({
        message: req.t("dashboard.noCloudsExist"),
        success: false
      })
    }
    const data = cloudFetchHook({ ip: cloud.ip, path: "/state", action: "get" })
    return res.status(STATUS.OK).json({
      id: String(cloud._id),
      data
    })
  } catch(error) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false
    })
  }
}

// Cleaning All Clouds
export const cleanALLClouds = async (req: Request, res: Response) => {
  try {

  } catch(error) {

  }
}