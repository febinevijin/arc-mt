import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { userRole } from "../utils/enum.js";
import { addProductByAdmin, editProductByAdmin } from "../controllers/product/adminProductController.js";
import { getProductDetailsById, listProductForUser } from "../controllers/product/userProductController.js";

const router = Router();
// admin
router.post("/add-product", protect([userRole.ADMIN]), addProductByAdmin);
router.put("/edit-product/:id", protect([userRole.ADMIN]), editProductByAdmin);

// user
router.get("/all-product", protect([userRole.USER]), listProductForUser);
router.get("/:id", protect([userRole.USER]), getProductDetailsById);

export default router;
