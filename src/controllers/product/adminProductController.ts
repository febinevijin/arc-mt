import { NextFunction, Request, Response } from "express";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/responseUtils.js";
import productValidationSchema from "../../lib/joiSchemas/productValidation.js";
import { generateAPIError } from "../../errors/apiError.js";
import { productService } from "../../services/product/product.js";
import { ObjectId } from "../../utils/mongoUtils.js";

export const addProductByAdmin = errorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { error } = productValidationSchema.validate(req.body);

    if (error) {
      return generateAPIError(error.details[0].message, 400);
    }
    const data = await productService.addProductByAdmin(req.body);
    return responseUtils.success(res, {
      data,
      status: 201,
    });
  }
);

export const editProductByAdmin = errorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { error } = productValidationSchema.validate(req.body);
    if (error) {
      return generateAPIError(error.details[0].message, 400);
    }

    const productId = req.params.id as string ;
    if (!ObjectId.isValid(productId)) {
      return generateAPIError("Invalid product ID", 400);
    }

    const data = await productService.editProductByAdmin(productId, req.body);
    return responseUtils.success(res, {
      data,
      status: 200,
    });
  }
);
