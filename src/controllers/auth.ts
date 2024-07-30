import { errorWrapper } from "../middleware/errorWrapper.js";
import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth/auth.js";
import { responseUtils } from "../utils/responseUtils.js";
import { userRole } from "../utils/enum.js";
import { generateAPIError } from "../errors/apiError.js";
import { userValidationSchema } from "../lib/joiSchemas/userValidation.js";

export const adminSignUp = errorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await authService.adminSignUp(req.body);
    return responseUtils.success(res, {
      data,
      status: 201,
    });
  }
);

export const commonLogin = errorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const role = req.query.role as string;
    // Check if role is valid
    if (![userRole.ADMIN, userRole.USER].includes(role as userRole)) {
      return await generateAPIError("Invalid role", 400);
    }
    const data = await authService.commonLogin(req.body, role);
    return responseUtils.success(res, {
      data,
      status: 201,
    });
  }
);

export const userSignUp = errorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    // Validate the request body
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return generateAPIError(error.details[0].message, 400);
    }
    const data = await authService.userSignUp(req.body);
    return responseUtils.success(res, {
      data,
      status: 201,
    });
  }
);
