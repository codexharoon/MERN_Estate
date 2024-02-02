import LISTING from "../models/listing.js";
import { errorHandler } from "../utils/error-handler.js";

export const create = async (req, res, next) => {
  try {
    const newListing = await LISTING.create(req.body);
    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      data: newListing,
    });
  } catch (err) {
    next(err);
  }
};

export const getListings = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler("401", "You are not authorized to view the listings")
    );
  }

  try {
    const listings = await LISTING.find({ userRef: req.params.id });
    if (!listings) {
      return next(errorHandler("404", "No listings found"));
    }

    res.status(200).json(listings);
  } catch (e) {
    return next(e);
  }
};
