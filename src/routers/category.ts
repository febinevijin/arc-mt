import { Router } from "express";
import { addProductCategory } from "../controllers/category/productCategory.js";
import { protect } from "../middleware/authMiddleware.js";
import { userRole } from "../utils/enum.js";


const router = Router();

router.post("/add-product-cat",protect([userRole.ADMIN]), addProductCategory);


export default router;
