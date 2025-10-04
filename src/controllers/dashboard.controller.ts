import { Request, Response } from "express";
import { STATUS } from "../utils/constants/http-status";
import { fetchCloudsData } from "../hooks/dashboard.hook";


export const getCloudInfo = async (req: Request, res: Response) => {
  try {

    const ips = await fetchCloudsData({})
    return res.status(STATUS.OK).json({
      ips
    })
  } catch(error) {
    console.log(error)
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false
    })
  }
}