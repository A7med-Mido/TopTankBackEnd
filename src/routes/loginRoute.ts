import { Router, Request, Response } from "express";
import { ZodError } from "zod";

const loginRoute: Router = Router();

loginRoute.post("/login", async (req: Request, res: Response) => {

  try {
      

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

export default loginRoute