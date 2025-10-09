import { Router } from "express";
import { getAllCloudsInfo } from "../controllers/dashboard.controller";


const dashboardRouter: Router = Router();

dashboardRouter.get("/dashboard", getAllCloudsInfo)

