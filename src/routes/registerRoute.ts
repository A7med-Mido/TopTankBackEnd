import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import studentRegistration from "../controllers/studentController";
import teacherRegistration from "../controllers/teacherController";
import Status from "../patterns/statusNumber";

const registerRoute: Router = Router();

registerRoute.post("/register/teacher", async (req: Request, res: Response) => {

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(Status.badRequest).json({
      message: "Request body is empty or undefined"
    });
  }

  try {
    
    const userData = req.body

    if(userData.user === "student") {
      const token = await studentRegistration(userData);
      return res.status(Status.successfulRegistration).json({
        message: "You have registered successfully.",
        success: true,
        token
      })
    }

    if(userData.user === "teacher") {
      const token = await teacherRegistration(userData);
      return res.status(Status.successfulRegistration).json({
        message: "You have registered successfully",
        success: true,
        token
      })
    }

    res.status(Status.badRequest).json({
      success: false,
      message: "You should set the role",
    });

  } catch (error) {
    if (error instanceof ZodError) {
      console.log("Validation errors:", error.issues);
      return res.status(Status.badRequest).json({
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
    res.status(Status.internalServerError).json({
      success: false,
      message: "Internal server error"
    });
  }
});

registerRoute.post("/register/student")

export default registerRoute