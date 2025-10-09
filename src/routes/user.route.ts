import { Router } from "express";
import { getStudentData, postStudentProfilePicture } from "../controllers/student.controller";
import { getTeacherData, postTeacherProfilePicture } from "../controllers/teacher.controller";
import { isAuthenticatedMiddleware } from "../middlewares/auth.middleware";
import fileUpload from "express-fileupload";

const userRoute: Router = Router();

// Student Routes
userRoute.post("/post/studentPP", isAuthenticatedMiddleware, fileUpload(), postStudentProfilePicture)
userRoute.get("/get/student/data", isAuthenticatedMiddleware, getStudentData)

// Teacher Routes
userRoute.post("/post/teacherPP", isAuthenticatedMiddleware, fileUpload(), postTeacherProfilePicture)
userRoute.get("/get/teacher/data", isAuthenticatedMiddleware, getTeacherData)




export default userRoute