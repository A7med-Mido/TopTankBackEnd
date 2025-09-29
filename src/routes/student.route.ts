import { Router, Request, Response, NextFunction } from "express";
import { getStudentData, postStudentProfilePicture } from "../controllers/user.controller";
import { isEndUserMiddleware } from "../middlewares/endUser.middleware";
import fileUpload from "express-fileupload";


const studentRoute: Router = Router();


studentRoute.post(
  "/ppp/student",
  isEndUserMiddleware,
  fileUpload(),
  postStudentProfilePicture
)

studentRoute.get("/getStudentData", isEndUserMiddleware, getStudentData)
studentRoute.post("/:sub", isEndUserMiddleware)

export default studentRoute