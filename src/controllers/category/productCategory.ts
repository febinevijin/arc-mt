import { errorWrapper } from "../../middleware/errorWrapper.js";
import { categoryService } from "../../services/category/category.js";
import { responseUtils } from "../../utils/responseUtils.js";
import { Response, NextFunction, Request } from "express";

export const addProductCategory = errorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await categoryService.addProductCategory(req.body);
    return responseUtils.success(res, {
      data,
      status: 201,
    });
  }
);