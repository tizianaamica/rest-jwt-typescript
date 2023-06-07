import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

const sendValidationErrorResponse = (
  res: Response,
  errorCode: number,
  errorMessage: string
) => {
  if (errorMessage.includes("email")) {
    return res.status(errorCode).json({ code: 0, message: errorMessage });
  } else {
    return res.status(errorCode).json({ code: 1, message: errorMessage });
  }
};

const validation =
  (schema: yup.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const errorCode = 400;
    try {
      await schema.validate(body);
      next();
    } catch (error) {
      if (error instanceof Error) {
        return sendValidationErrorResponse(res, errorCode, error.message);
      }
    }
  };

export { validation };
