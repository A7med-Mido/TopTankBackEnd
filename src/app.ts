import express from "express"
import authRoute from "./routes/auth.route";
import path from "path";
import studentRoute from "./routes/user.route";
import i18next from "i18next";
import middleware from "i18next-http-middleware"

const app = express();

app.use(express.json());
app.use(middleware.handle(i18next));
app.use("/public", express.static(path.join(process.cwd(), "public")));


app.use("/api", studentRoute)
app.use("/api", authRoute);




export default app