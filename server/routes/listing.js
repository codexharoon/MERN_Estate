import express from "express";
import { create, getListings } from "../controller/listing.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/all/:id", verifyToken, getListings);
router.post("/create", verifyToken, create);

export default router;
