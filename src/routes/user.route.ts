import { Router } from "express";
import { getStudentDataController, postStudentProfilePictureController } from "../controllers/student.controller";
import { getTeacherDataController, postTeacherProfilePictureController } from "../controllers/teacher.controller";
import { isAuthenticatedMiddleware } from "../middlewares/auth.middleware";
import fileUpload from "express-fileupload";

const userRoute: Router = Router();

// Student Routes
userRoute.post(
  "/post/studentPP",
  isAuthenticatedMiddleware,
  fileUpload(),
  postStudentProfilePictureController
);
userRoute.get(
  "/get/student/data",
  isAuthenticatedMiddleware,
  getStudentDataController
);

// Teacher Routes
userRoute.post(
  "/post/teacherPP",
  isAuthenticatedMiddleware,
  fileUpload(),
  postTeacherProfilePictureController
);
userRoute.get(
  "/get/teacher/data",
  isAuthenticatedMiddleware,
  getTeacherDataController
);




export default userRoute