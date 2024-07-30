import { Router } from "express";
import { adminSignUp, commonLogin, userSignUp } from "../controllers/auth.js";

const router = Router();


router.post("/admin-signup", adminSignUp);
router.post("/login", commonLogin);
router.post("/signup", userSignUp);


export default router;