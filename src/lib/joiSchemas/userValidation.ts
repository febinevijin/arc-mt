
import Joi from "joi";
import { ColorEnum } from "../../utils/enum.js";
import { ObjectId } from "../../utils/mongoUtils.js";

// Custom validation for MongoDB ObjectId
const objectIdValidation = (value: any, helpers: Joi.CustomHelpers) => {
  if (!ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const userValidationSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().trim().required(),
  password: Joi.string().min(8).required(),
});

// user product page
export const productQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1),
  page: Joi.number().integer().min(1),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0),
  color: Joi.string().valid(...ColorEnum),
  rating: Joi.number().min(1).max(5),
  sort: Joi.string().valid("price-high-low", "price-low-high", "newest"),
  category: Joi.string().custom(objectIdValidation).allow(null),
});

export const cartValidation = Joi.object({
  productId: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),
  quantity: Joi.number().min(1),
});