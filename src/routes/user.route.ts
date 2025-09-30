import { Router } from "express";
import { getUserData, postUserProfilePicture } from "../controllers/user.controller";
import { isUserMiddleware } from "../middlewares/auth.middleware";
import fileUpload from "express-fileupload";

const userRoute: Router = Router();

userRoute.post(
  "/ppp/:userRole",
  isUserMiddleware,
  fileUpload(),
  postUserProfilePicture
)

userRoute.get("/userData/:userRole", isUserMiddleware, getUserData)
userRoute.post("student/:sub", isUserMiddleware)

export default userRoute