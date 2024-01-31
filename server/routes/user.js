import express from "express";
const router = express.Router();
import { verifyToken } from "../utils/verifyToken.js";
import { update, deleteUser } from "../controller/user.js";

router.put("/update/:id", verifyToken, update);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
