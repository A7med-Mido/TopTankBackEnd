import { Router } from "express";
import { teacherRegister } from "../controllers/authController";




const registerRoute: Router = Router();

registerRoute.post("/register/teacher", teacherRegister);

registerRoute.post("/register/student")

export default registerRoute