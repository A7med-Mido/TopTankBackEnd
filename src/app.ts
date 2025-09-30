import express from "express"
import authRoute from "./routes/auth.route";
import path from "path";
import studentRoute from "./routes/user.route";
import i18n from "./locales/i18n.locales";
import middleware from "i18next-http-middleware"
import { Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(middleware.handle(i18n));
app.use("/public", express.static(path.join(process.cwd(), "public")));


app.use("/api", studentRoute)
app.use("/api", authRoute);




export default app