import { Router } from "express";
import { postStudentProfilePicture } from "../controllers/studentController";
import { isStudentMiddleware } from "../middlewares/studentMiddleware";
import fileUpload from "express-fileupload";


const studentRoute: Router = Router();


studentRoute.post("/ppp/student", isStudentMiddleware, fileUpload(), postStudentProfilePicture)
studentRoute.get("/student", isStudentMiddleware, )


export default studentRoute