import { Router } from "express";
import { getUserData, postUserProfilePicture } from "../controllers/user.controller";
import { isEndUserMiddleware } from "../middlewares/endUser.middleware";
import fileUpload from "express-fileupload";


const userRoute: Router = Router();


userRoute.post(
  "/ppp/:userRole",
  isEndUserMiddleware,
  fileUpload(),
  postUserProfilePicture
)

userRoute.get("/userData/userRole", isEndUserMiddleware, getUserData)
userRoute.post("/:sub", isEndUserMiddleware)

export default userRoute