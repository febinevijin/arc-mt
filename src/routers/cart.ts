import { Router } from "express";
import { addProductCategory } from "../controllers/category/productCategory.js";
import { protect } from "../middleware/authMiddleware.js";
import { userRole } from "../utils/enum.js";
import { addProductToCart, getCart, removeProductFromCart } from "../controllers/cart/userCartController.js";

const router = Router();

router.get("/", protect([userRole.USER]), getCart);
router.post("/add", protect([userRole.USER]), addProductToCart);
router.delete(
  "/remove-product",
  protect([userRole.USER]),
  removeProductFromCart
);

export default router;
