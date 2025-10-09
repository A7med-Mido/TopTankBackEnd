import { Router } from "express";
import {
  isAuthenticatedMiddleware
} from "../middlewares/auth.middleware";
import {
  deleteUserController,
  registerUserController,
  loginUserController
} from "../controllers/auth.controller";
import { schemaValidatorMiddleware } from "../middlewares/schemaValidator.middleware";
import { studentSchema, teacherSchema } from "../zod/zod.validator";


const authRoute: Router = Router();

// Student
authRoute.post(
  "/register/student",
  schemaValidatorMiddleware(studentSchema),
  registerUserController("student")
);
authRoute.post(
  "/login/student", 
  schemaValidatorMiddleware(studentSchema),
  loginUserController("student")
);


authRoute.post(
  "/register/teacher",
  schemaValidatorMiddleware(teacherSchema),
  registerUserController("teacher")
);
authRoute.post(
  "/login/teacher", 
  schemaValidatorMiddleware(teacherSchema),
  loginUserController("teacher")
);

// Delete with user's JWT
authRoute.delete("/delete/user", isAuthenticatedMiddleware, deleteUserController);



export default authRoute