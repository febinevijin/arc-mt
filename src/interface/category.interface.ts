import ProductCategoryModel from "../models/category/ProductCategory.js";


export type ProductCategoryDocument = InstanceType<typeof ProductCategoryModel>;

export interface CategoryData {
  categoryName: string;
}
