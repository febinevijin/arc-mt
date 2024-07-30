import { NextFunction, Request, Response } from "express";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { RequestWithUser } from "../../interface/app.interface.js";
import { cartValidation } from "../../lib/joiSchemas/userValidation.js";
import { generateAPIError } from "../../errors/apiError.js";
import { responseUtils } from "../../utils/responseUtils.js";
import { cartService } from "../../services/cart/cart.js";

export const addProductToCart = errorWrapper(
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const userId = req.user?._id as string;
    const { error } = cartValidation.validate(req.query);
    if (error) {
      return generateAPIError(error.details[0].message, 400);
    }
    const productId = req.query.productId as string;
    const quantity = Number(req.query.quantity) || 1;

    const data = await cartService.addProductToCart(
      userId,
      productId,
      quantity
    );
    return responseUtils.success(res, {
      data,
      status: 201,
    });
  }
);
export const removeProductFromCart = errorWrapper(
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const userId = req.user?._id as string;
    const { error } = cartValidation.validate(req.query);
    if (error) {
      return generateAPIError(error.details[0].message, 400);
    }
    const productId = req.query.productId as string;
    
    const data = await cartService.removeProductFromCart(userId, productId);
    return responseUtils.success(res, {
      data,
      status: 201,
    });
  }
);
export const getCart = errorWrapper(
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const userId = req.user?._id as string;
    
    const productId = req.query.productId as string;

    const data = await cartService.getCart(userId);
    return responseUtils.success(res, {
      data,
      status: 201,
    });
  }
);
