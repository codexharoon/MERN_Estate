import express from "express";
import { signup, login, google, logout } from "../controller/auth.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google);
router.get("/logout", verifyToken, logout);

export default router;
