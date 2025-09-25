import { Router } from "express";
import { postStudentProfilePicture } from "../controllers/studentController";
import { isStudentMiddleware } from "../middlewares/studentMiddleware";
import fileUpload from "express-fileupload";


const studentRoute: Router = Router();


studentRoute.post("/pp/student", postStudentProfilePicture)



export default studentRoute