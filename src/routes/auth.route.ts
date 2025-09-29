import { Router } from "express";
import {
  isEndUserExistMiddleware,
  isEndUserMiddleware
} from "../middlewares/endUser.middleware";
import {
  deleteUser,
  userRegister,
  userLogin
} from "../controllers/auth.contorller";


const authRoute: Router = Router();


authRoute.post("/register/:userRole", isEndUserExistMiddleware, userRegister);
authRoute.post("/login/:userRole", userLogin);
authRoute.delete("/delete/user", isEndUserMiddleware, deleteUser);



export default authRoute