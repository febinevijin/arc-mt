
import Joi from "joi";
import { ColorEnum } from "../../utils/enum.js";
import { ObjectId } from "../../utils/mongoUtils.js";


const productValidationSchema = Joi.object({
  productName: Joi.string().trim().required(),
  price: Joi.number().required(),
  category: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),
  size: Joi.array().items(Joi.string().valid("m", "l", "xl", "xxl")),
  color: Joi.array().items(Joi.string().valid(...ColorEnum)),
  image: Joi.array().items(Joi.string().uri()).required(),
  stock: Joi.number().min(0).required(),
});

export default productValidationSchema;