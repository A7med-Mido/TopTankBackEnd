import { Router } from "express";
import { deleteStudent, deleteTeacher, studentRegister, teacherRegister } from "../controllers/authController";
import { isTeacherAlreadyExistMiddleware, isTeacherMiddleware } from "../middlewares/teacherMiddleware";
import { isStudentAlreadyExistMiddleware, isStudentMiddleware } from "../middlewares/studentMiddleware";


const authRoute: Router = Router();

// Teacher Routes
authRoute.post("/register/teacher",isTeacherAlreadyExistMiddleware, teacherRegister);
authRoute.delete("/delete/teacher", isTeacherMiddleware, deleteTeacher)



// Student Routes
authRoute.post("/register/student", isStudentAlreadyExistMiddleware, studentRegister)
authRoute.delete("/delete/student", isStudentMiddleware, deleteStudent)

export default authRoute