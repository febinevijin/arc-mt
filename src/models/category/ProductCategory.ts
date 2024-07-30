import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensures category names are unique
    },
  },
  { timestamps: true }
);

const ProductCategory = mongoose.model("productCategories", ProductCategorySchema);
export default ProductCategory;
