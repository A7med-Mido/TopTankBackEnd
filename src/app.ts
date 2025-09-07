import express,  { Response, Request, NextFunction } from "express"
import registrationRoute from "./routes/registrationRoute";
import { encrypt, JWTPayload } from "./utils/encryption";
import { verify } from "jsonwebtoken";
// import isStudent from "./middlewares/isStudentMiddleware";
const app = express();
app.use(express.json()); // ⭐️ THIS LINE IS CRITICAL

app.use("/api", registrationRoute);

// app.get("/test", isStudent)


// app.post("/test", async (req: Request, res: Response) => {
//   try {
//     const { phone, password } = req.body
//     const token = encrypt({ password, phone })

//     return res.status(200).json({
//       token: token
//     })
//   } catch (error) {
//     return res.status(404).json({
//       error: error
//     })
//   }
// })
app.post("/decode", (req: Request, res: Response) => {
  try {
    const { token } = req.body
    const { password, phone } = verify(token, process.env.JWT_SECRET as string) as JWTPayload
    return res.status(200).json({ 
      password,
      phone
     })
  } catch (error) {
    return res.status(404).json({
      error: error
    })
  }
})


export default app