import express from "express";
import {
  create,
  deleteListing,
  getListings,
  getSpecificListing,
  search,
  updateListing,
} from "../controller/listing.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/get/:id", getSpecificListing);
router.get("/all/:id", verifyToken, getListings);
router.post("/create", verifyToken, create);
router.put("/update/:id", verifyToken, updateListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.get("/search", search);

export default router;
