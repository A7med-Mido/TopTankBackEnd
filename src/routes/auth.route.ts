import { Router } from "express";
import {
  isUserExistMiddleware,
  isUserMiddleware
} from "../middlewares/auth.middleware";
import {
  deleteUser,
  userRegister,
  userLogin
} from "../controllers/auth.controller";


const authRoute: Router = Router();


authRoute.post("/register/:userRole", isUserExistMiddleware, userRegister);
authRoute.post("/login/:userRole", userLogin);
authRoute.delete("/delete/user", isUserMiddleware, deleteUser);



export default authRoute