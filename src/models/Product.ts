import mongoose from "mongoose";
import { ObjectId } from "../utils/mongoUtils.js";
import { ColorEnum } from "../utils/enum.js";


const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "productCategories",
      required: true,
    },
    size: {
      type: [String],
      enum: ["m", "l", "xl", "xxl"],
    },
    color: {
      type: [String],
      enum: ColorEnum,
      default: [],
    },
    image: {
      type: [String],
      required: true,
    },
    rating: [
      {
        userId: {
          type: ObjectId,
          ref: "user",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
      },
    ],
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("products", ProductSchema);
export default Product;
