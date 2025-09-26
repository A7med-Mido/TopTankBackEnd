import { Router, Request, Response, NextFunction } from "express";
import { getStudentData, postStudentProfilePicture } from "../controllers/studentController";
import { isStudentMiddleware } from "../middlewares/studentMiddleware";
import fileUpload from "express-fileupload";


const studentRoute: Router = Router();


studentRoute.post(
  "/ppp/student",
  isStudentMiddleware,
  fileUpload(),
  postStudentProfilePicture
)

studentRoute.get("/getStudentData", isStudentMiddleware, getStudentData)
studentRoute.post("/:sub", isStudentMiddleware)

export default studentRoute