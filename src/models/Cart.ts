import mongoose from "mongoose";
import { ObjectId } from "../utils/mongoUtils.js";

const CartItemSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "user", // Reference to the User model
      required: true,
    },
    productId: {
      type: ObjectId,
      ref: "products", // Reference to the Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Minimum quantity of 1
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("carts", CartItemSchema);
export default Cart;
