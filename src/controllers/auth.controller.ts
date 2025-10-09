import { Request, Response } from "express";
import { UserRole } from "../zod/zod.validator";
import { STATUS } from "../utils/constants/http-status";
import { createUser, deleteUser, loginUser } from "../services/auth.service";

// Register User
export const registerUserController = (userRole: UserRole) => async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const token = await createUser(userRole, userData);

    if (!token) {
      return res.status(STATUS.UNPROCESSABLE_ENTITY).json({
        message: req.t("common.wrongParams"),
        success: false,
      });
    }

    return res.status(STATUS.OK).json({
      message: req.t("auth.registered"),
      success: true,
      token,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false,
    });
  }
};

// Login User
export const loginUserController = (userRole: UserRole) => async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const token = await loginUser(userRole, userData);

    if(token === null) {
      return res.status(STATUS.UNAUTHORIZED).json({
        message: req.t("auth.wrongCredentials"),
        success: false,
      });
    }

    if(token === undefined) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Invalid role — possibly admin",
        success: false,
      });
    }

    if(typeof token === "string") {
      return res.status(STATUS.OK).json({
        message: req.t("auth.loggedIn"),
        success: true,
        token,
      });
    }

    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false,
    });
  }
};

// 🧩 Delete User
export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id, userRole } = req.user;
    const result = await deleteUser(userRole, id);

    if(result === "userDoesNotExistAnymore") {
      return res.status(STATUS.NOT_FOUND).json({
        message: req.t("user.noUserAnymore"),
        success: false,
      });
    }

    if(!result) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Invalid role — possibly admin",
        success: false,
      });
    }  

    if(result) {
      return res.status(STATUS.OK).json({
        message: req.t("user.deleted"),
        success: true,
      });
    }

    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: req.t("common.internalServerError"),
      success: false,
    });
  }
};
