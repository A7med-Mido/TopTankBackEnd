import express from "express"
import authRoute from "./routes/authRoute";
import path from "path";
import studentRoute from "./routes/studentRoute";

const app = express();

app.use("/api", studentRoute)
app.use(express.json()); // ⭐️ THIS LINE IS CRITICAL
app.use("/public", express.static(path.join(process.cwd(), "public")));


app.use("/api", authRoute);




export default app