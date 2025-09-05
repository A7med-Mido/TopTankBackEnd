import express,  { Response, Request, NextFunction } from "express"

const app = express();

app.get("/api", (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: "hello !! from Express" })
});



export default app