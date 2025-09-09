import express,  { Response, Request, NextFunction } from "express"
import registerRoute from "./routes/authRoute";
import { encrypt, JWTPayload } from "./auth/encryption";
import { verify } from "jsonwebtoken";


const app = express();
app.use(express.json()); // ⭐️ THIS LINE IS CRITICAL

app.use("/api", registerRoute);



export default app