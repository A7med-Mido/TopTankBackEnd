import { Router, Request, Response, NextFunction } from "express";
import { teacherSchema } from "../types/ZodValidators";
const router: Router = Router();



router.post("/register", async (req: Request, res: Response) => {
  const { data, success } = teacherSchema.safeParse(req.body)

  if(!success) {
    return res.json({
      message: "Invalid Data"
    })
  }

  res.json(data)
})



const Registration = router
export default Registration