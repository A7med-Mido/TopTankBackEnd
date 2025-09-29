import { Router } from "express";
import {
  isEndUserExistMiddleware,
  isEndUserMiddleware
} from "../middlewares/endUserMiddleware";
import {
  deleteUser,
  userRegister,
  userLogin
} from "../controllers/authController";


const authRoute: Router = Router();


authRoute.post("/register/:userRole", isEndUserExistMiddleware, userRegister);
authRoute.post("/login/:userRole", userLogin);
authRoute.delete("/delete/user", isEndUserMiddleware, deleteUser);



export default authRoute