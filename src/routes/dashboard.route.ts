import { Router } from "express";
import { isUserMiddleware } from "../middlewares/auth.middleware";



const dashboardRouter: Router = Router();

dashboardRouter.get("/dashboard", isUserMiddleware, )

