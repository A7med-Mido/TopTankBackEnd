import express from "express"
import authRoute from "./routes/auth.route";
import path from "path";
import studentRoute from "./routes/student.route";


const app = express();

app.use(express.json());
app.use("/public", express.static(path.join(process.cwd(), "public")));



app.use("/api", studentRoute)
app.use("/api", authRoute);




export default app