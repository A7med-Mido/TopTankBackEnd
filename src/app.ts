import express from "express"
import authRoute from "./routes/auth.route";
import path from "path";
import userRoute from "./routes/user.route";
import i18n from "./locales/i18n.locales";
import middleware from "i18next-http-middleware"


const app = express();

app.use(express.json());
app.use(middleware.handle(i18n));
app.use("/public", express.static(path.join(process.cwd(), "public")));



app.use("/api", authRoute);
app.use("/api", userRoute)




export default app