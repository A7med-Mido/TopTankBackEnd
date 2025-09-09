import { Request, Response, NextFunction } from "express";
import { decrypt } from "../auth/encryption";
import TeacherModel from "../configs/models/TeacherSchema";
import StudentModel from "../configs/models/StudentSchema";


const isAlreadyRegistered = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body
    if(userData.user === "student") {
      
    }


  } catch (error) {
    console.log(error)
    res.status(404).json({
      message: "Internal server error",
      error
    });
  };
};

export default isAlreadyRegistered