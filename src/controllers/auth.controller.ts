import { Request, Response } from "express"
import { UserRole } from "../zod/zod.validator"
import { STATUS } from "../utils/constants/http-status"
import { createUser, deleteUserById, loginUser } from "../services/auth.service"

// User Registration
export const userRegister = (userRole: UserRole) => async (req: Request, res: Response) => {
  try {
    const userData = req.body

    const token = await createUser(userRole, userData)
    if(!token) {
      return res.status(STATUS.UNPROCESSABLE_ENTITY).json({
        message: req.t("common.wrongParams"),
        success: false
      })
    }
    return res.status(STATUS.OK).json({
      message: req.t("auth.registered"),
      success: true,
      token
    })

  } catch(error) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false
    });
  }
}

// User Login
export const userLogin = (userRole: UserRole) => async (req: Request, res: Response) => {
  try {
    const userData = req.body

    const token = await loginUser(userRole,  userData)

    switch(typeof token) {
      case null: {
        return res.status(STATUS.UNAUTHORIZED).json({
          message: req.t("auth.wrongCredentials"),
          success: false
        })
      }
      case undefined: {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "wrong role maybe maybe admin",
          success: false
        })
      }
      case "string": {
        return res.status(STATUS.OK).json({
          message: req.t("auth.loggedIn"),
          success: true,
          token
        })
      }
    }
  } catch (error) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: req.t("common.internalServerError")
    });
  }
}

// delete Student
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id, userRole } = req.user
    
    const isDeleted = await deleteUserById(userRole, id)
    switch (isDeleted) {
      case "userDoesNotExistAnymore": {
          return res.status(STATUS.NOT_FOUND).json({
          message: req.t("user.noUserAnymore"),
          success: false
        })
      }
      case null: {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "wrong role maybe maybe admin",
          success: false
        })
      }
      case true: {
        return res.status(STATUS.OK).json({
          message: req.t("user.deleted"),
          success: true
        })
      }
    }
  } catch(error) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false
    })
  }
}