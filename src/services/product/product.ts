import { generateAPIError } from "../../errors/apiError.js";
import { PaginationData } from "../../interface/app.interface.js";
import {
  ProductData,
  ProductDocument,
  ProductFilterOptions,
 
} from "../../interface/product.interface.js";
import Cart from "../../models/Cart.js";
import ProductCategory from "../../models/category/ProductCategory.js";
import Product from "../../models/Product.js";
import { ObjectId } from "../../utils/mongoUtils.js";

const addProductByAdmin = async (
  data: ProductData
): Promise<ProductDocument> => {
  const { category } = data;
  const checkCategoryExist = await ProductCategory.findById(category);
  if (!checkCategoryExist)
    return generateAPIError("product category not found", 400);

  const product = await Product.create(data);
  return product;
};

const editProductByAdmin = async (
  productId: string,
  data: ProductData
): Promise<ProductDocument | null> => {
  const { category } = data;

  const checkCategoryExist = await ProductCategory.findById(category);
  if (!checkCategoryExist) {
    return generateAPIError("Product category not found", 400);
  }

  // Find the product by ID and check if it is deleted
  const product = await Product.findById(productId);

  if (!product) {
    return generateAPIError("Product not found", 404);
  }

  if (product.isDeleted) {
    return generateAPIError("Product is deleted and cannot be updated", 400);
  }

  // Update the product if it is not deleted
  const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
    new: true,
  });

  return updatedProduct;
};

const listProductForUser = async (
  {options}: PaginationData,
  filters: ProductFilterOptions
): Promise<any> => {
  const { limit, skip } = options;
  const { minPrice, maxPrice, color, rating,sort,category } = filters;
  const matchStage: any = { isDeleted: false };

  if (minPrice !== undefined) {
    matchStage.price = { ...matchStage.price, $gte: minPrice };
  }

  if (maxPrice !== undefined) {
    matchStage.price = { ...matchStage.price, $lte: maxPrice };
  }

  // if (color) {
  //   matchStage.color = { $in: color };
  // }
  if (color) {
    matchStage.color = color;
  }
  const sortStage: any = {};

  switch (sort) {
    case "price-high-low":
      sortStage.price = -1;
      break;
    case "price-low-high":
      sortStage.price = 1;
      break;
    case "newest":
      sortStage.createdAt = -1;
      break;
    default:
      sortStage.createdAt = -1;
  }
  
   if (category !=undefined) {
     matchStage.category = new ObjectId(category); // Convert to ObjectId
   }
  const products = await Product.aggregate([
    // Stage 1: Filter out deleted products if needed
    { $match: matchStage },

    // Stage 2: Calculate the average rating
    {
      $addFields: {
        averageRating: {
          $cond: {
            if: { $gt: [{ $size: "$rating" }, 0] },
            then: { $avg: "$rating.rating" },
            else: null,
          },
        },
      },
    },

    // Filter by rating
    ...(rating !== undefined
      ? [{ $match: { averageRating: { $gte: rating } } }]
      : []),

    // Stage 3: Populate category (if category is a reference)
    {
      $lookup: {
        from: "productcategories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

    // Optional: Project fields you want to include in the result
    {
      $project: {
        _id: 1,
        productName: 1,
        price: 1,
        size: 1,
        color: 1,
        image: 1,
        stock: 1,
        createdAt: 1,
        updatedAt: 1,
        averageRating: 1,
        "category.categoryName": 1,
        "category._id": 1,
      },
    },
    { $sort: sortStage },
    {
      $skip: skip ?? 0,
    },
    {
      $limit: limit ?? 15,
    },
  ]);

  return products;
};

const getProductDetailsById = async (productId: string, userId: string) => {
  // Fetch product details
  const product = await Product.findById(productId);
  if (!product) {
    return generateAPIError("Product not found", 404);
  }
  // Check if the product is in the user's cart
  const cartItem = await Cart.findOne({ userId, productId })
  const isAddedToCart = !!cartItem;

   const responseData = {
     ...product.toObject(),
     isAddedToCart,
  };
  
  return responseData;
}

export const productService = {
  addProductByAdmin,
  editProductByAdmin,
  listProductForUser,
  getProductDetailsById,
};
