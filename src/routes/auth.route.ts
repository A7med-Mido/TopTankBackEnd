import { Router } from "express";
import {
  isUserAlreadyAuthenticatedMiddleware,
  isAuthenticatedMiddleware
} from "../middlewares/auth.middleware";
import {
  deleteUser,
  userRegister,
  userLogin
} from "../controllers/auth.controller";
import { schemaValidatorMiddleware } from "../middlewares/schemaValidator.middleware";
import { studentSchema, teacherSchema } from "../zod/zod.validator";


const authRoute: Router = Router();

// Student
authRoute.post(
  "/register/student",
  schemaValidatorMiddleware(studentSchema),
  isUserAlreadyAuthenticatedMiddleware("student"),
  userRegister("student")
);
authRoute.post(
  "/login/student", 
  schemaValidatorMiddleware(studentSchema),
  userLogin("student")
);


authRoute.post(
  "/register/teacher",
  schemaValidatorMiddleware(teacherSchema),
  isUserAlreadyAuthenticatedMiddleware("teacher"),
  userRegister("teacher")
);
authRoute.post(
  "/login/teacher", 
  schemaValidatorMiddleware(teacherSchema),
  userLogin("teacher")
);

// Delete with user's JWT
authRoute.delete("/delete/user", isAuthenticatedMiddleware, deleteUser);



export default authRoute