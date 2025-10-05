import { Router } from "express";
import { getStudentData, postStudentProfilePicture } from "../controllers/student.controller";
import { getTeacherData, postTeacherProfilePicture } from "../controllers/teacher.controller";
import { isAuthenticated} from "../middlewares/auth.middleware";
import fileUpload from "express-fileupload";

const userRoute: Router = Router();

// Student Routes
userRoute.post("/post/studentPP", isAuthenticated, fileUpload(), postStudentProfilePicture)
userRoute.get("/get/student/data", isAuthenticated, getStudentData)

// Teacher Routes
userRoute.post("/post/teacherPP", isAuthenticated, fileUpload(), postTeacherProfilePicture)
userRoute.get("/get/teacher/data", isAuthenticated, getTeacherData)




export default userRoute