import { Router, Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import studentRegistration from "../controllers/studentRegistration";
import teacherRegistration from "../controllers/teacherRegistration";

const router: Router = Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Request body is empty or undefined"
    });
  }

  try {
    
    const userData = req.body

    if(userData.user === "student") {
      const token = await studentRegistration(userData);
      return res.status(201).json({
        message: "You have registered successfully.",
        success: true,
        token
      })
    }

    if(userData.user === "teacher") {
      const token = await teacherRegistration(userData);
      return res.status(201).json({
        message: "You have registered successfully",
        success: true,
        token
      })
    }

    res.status(401).json({
      success: true,
      message: "You should set the role",
    });

  } catch (error) {
    if (error instanceof ZodError) {
      console.log("Validation errors:", error.issues);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }))
      });
    }
    
    // Handle other errors
    console.error("Unexpected error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});
const registrationRoute = router
export default registrationRoute