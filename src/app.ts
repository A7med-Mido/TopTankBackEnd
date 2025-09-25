import express from "express"
import authRoute from "./routes/authRoute";
import path from "path";

const app = express();

app.use(express.json()); // ⭐️ THIS LINE IS CRITICAL
app.use("/public", express.static(path.join(process.cwd(), "public")));


app.use("/api", authRoute);



export default app