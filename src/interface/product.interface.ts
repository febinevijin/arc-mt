import { ObjectId } from "mongoose";
import { ColorEnum } from "../utils/enum.js";
import ProductModel from "../models/Product.js"

export type ProductDocument = InstanceType<typeof ProductModel>;

export interface ProductData {
  productName: string;
  price: number;
  category: ObjectId;
  size?: ("m" | "l" | "xl" | "xxl")[];
  color?: (typeof ColorEnum)[number][];
  image: string[];
  stock: number;

  
}

export interface ProductFilterOptions {
  minPrice?: number;
  maxPrice?: number;
  color?: string[];
  rating?: number;
  sort?: "price-high-low" | "price-low-high" | "newest";
  category?: string;
}