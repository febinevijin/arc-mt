import { Router } from "express";
import auth from "./auth.js"
import category from "./category.js"
import product from "./product.js";
import cart from "./cart.js";

const router = Router();

router.use("/auth",auth)
router.use("/category",category)
router.use("/product",product)
router.use("/cart",cart)

export default router;