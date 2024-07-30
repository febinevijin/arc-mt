import { generateAPIError } from "../../errors/apiError.js";
import { CategoryData, ProductCategoryDocument } from "../../interface/category.interface.js";
import ProductCategory from "../../models/category/ProductCategory.js";


const addProductCategory = async (
  data: CategoryData
): Promise<ProductCategoryDocument> => {
    const { categoryName } = data;
    if(!categoryName) return generateAPIError("must provide a category name",400)
  const checkCategoryExist = await ProductCategory.findOne({ categoryName });
  if (checkCategoryExist)
    return generateAPIError("category already exists", 400);
  const category = await ProductCategory.create({
    categoryName,
  });
  return category;
};

export const categoryService = {
  addProductCategory,
};