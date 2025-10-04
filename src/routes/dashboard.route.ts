import { Router } from "express";
import { isUserMiddleware } from "../middlewares/auth.middleware";
import { getCloudInfo } from "../controllers/dashboard.controller";


const dashboardRouter: Router = Router();

dashboardRouter.get("/dashboard", getCloudInfo)

