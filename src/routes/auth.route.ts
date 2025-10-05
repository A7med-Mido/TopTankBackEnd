import { Router } from "express";
import {
  isUserExistMiddleware,
  isAuthenticated
} from "../middlewares/auth.middleware";
import {
  deleteUser,
  userRegister,
  userLogin
} from "../controllers/auth.controller";


const authRoute: Router = Router();


authRoute.post("/register/:userRole", isUserExistMiddleware, userRegister);
authRoute.post("/login/:userRole", userLogin);
authRoute.delete("/delete/user", isAuthenticated, deleteUser);



export default authRoute