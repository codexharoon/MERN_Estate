import express from "express";
import { create, deleteListing, getListings } from "../controller/listing.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/all/:id", verifyToken, getListings);
router.post("/create", verifyToken, create);
router.delete("/delete/:id", verifyToken, deleteListing);
export default router;
