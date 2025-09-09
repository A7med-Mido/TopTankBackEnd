import express,  { Response, Request, NextFunction } from "express"
import { encrypt, JWTPayload } from "./auth/encryption";
import { verify } from "jsonwebtoken";
import authRoute from "./routes/authRoute";


const app = express();
app.use(express.json()); // ⭐️ THIS LINE IS CRITICAL

app.use("/api", authRoute);



export default app