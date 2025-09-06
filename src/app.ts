import express,  { Response, Request, NextFunction } from "express"
import Registration from "./routes/Registration";
const app = express();
app.use(express.json()); // ⭐️ THIS LINE IS CRITICAL

app.use("/api", Registration);



export default app