import { Router, Request, Response, NextFunction } from "express";
import { studentSchema, teacherSchema } from "../types/ZodValidators";
import { z } from "zod";

const router: Router = Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Raw request body:", req.body); // Check if this is still undefined
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: "Request body is empty or undefined",
        message: "Make sure you're sending JSON with Content-Type: application/json"
      });
    }

    const validatedData = studentSchema.parse(req.body);
    console.log("Validated data:", validatedData);
    
    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: validatedData
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
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

export default router;