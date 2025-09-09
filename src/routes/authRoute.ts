import { Router } from "express";
import { deleteStudent, deleteTeacher, studentLogin, studentRegister, teacherLogin, teacherRegister } from "../controllers/authController";
import { isTeacherAlreadyExistMiddleware, isTeacherMiddleware } from "../middlewares/teacherMiddleware";
import { isStudentAlreadyExistMiddleware, isStudentMiddleware } from "../middlewares/studentMiddleware";


const authRoute: Router = Router();

// Teacher Routes
authRoute.post("/register/teacher",isTeacherAlreadyExistMiddleware, teacherRegister);
authRoute.post("/login/teacher", teacherLogin)
authRoute.delete("/delete/teacher", isTeacherMiddleware, deleteTeacher)



// Student Routes
authRoute.post("/register/student", isStudentAlreadyExistMiddleware, studentRegister)
authRoute.post("/login/teacher", studentLogin)
authRoute.delete("/delete/student", isStudentMiddleware, deleteStudent)

export default authRoute