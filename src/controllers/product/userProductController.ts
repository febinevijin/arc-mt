import { NextFunction, Response } from "express";
import { PaginationData, RequestWithUser } from "../../interface/app.interface.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { getPaginationOptions } from "../../utils/paginationUtils.js";
import { responseUtils } from "../../utils/responseUtils.js";
import { productService } from "../../services/product/product.js";
import { generateAPIError } from "../../errors/apiError.js";
import { productQuerySchema } from "../../lib/joiSchemas/userValidation.js";
import { ObjectId } from "../../utils/mongoUtils.js";



export const listProductForUser = errorWrapper(async (req: RequestWithUser,
    res: Response,
    next: NextFunction): Promise<any> => {
      const { error, value: query } = productQuerySchema.validate(req.query);
      if (error) {
        return generateAPIError(error.details[0].message, 400);
    }
    
     const paginationOptions = getPaginationOptions({
       limit: req.query?.limit,
       page: req.query?.page,
     });
     const options = {
       ...paginationOptions,
       sort: { createdAt: -1 },
    };
     const filters = {
       minPrice: query.minPrice,
       maxPrice: query.maxPrice,
       color: query.color,
       rating: query.rating,
       sort: query.sort,
       category: query.category,
     };
 
      const data = await productService.listProductForUser(
        {
          options,
        },
        filters
      );
      return responseUtils.success(res, {
        data,
        status: 200,
      });
})
    
export const getProductDetailsById = errorWrapper(async(req: RequestWithUser,
    res: Response,
  next: NextFunction): Promise<any> => {
  const productId = req.params.id as string;
    // Validate the productId
    if (!ObjectId.isValid(productId)) {
      return generateAPIError("Invalid product ID", 400);
  }
  const userId = req.user?._id as string;
  const data = await productService.getProductDetailsById(productId,userId);
  return responseUtils.success(res, {
    data,
    status: 200,
  });
  })