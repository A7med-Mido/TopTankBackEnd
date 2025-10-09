import { ZodSchema } from "zod"
import { Request, Response, NextFunction } from "express"
import { STATUS } from "../utils/constants/http-status"
import { ZodError } from "zod"
import { zodErrorFormatter } from "../zod/zod.validator"

export const schemaValidatorMiddleware = (
  schema: ZodSchema
) => async(req: Request, res: Response, next: NextFunction) => {
  try {
    if(!req.body) {
      return res.status(STATUS.NO_CONTENT).json({
        message: req.t("common.noContent"),
        success: false
      })
    }
    const user = schema.parse({
      ...req.body
    })
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(STATUS.UNPROCESSABLE_ENTITY).json({
        success: false,
        errors: zodErrorFormatter(error, req.t)
      });
    }
  }
}