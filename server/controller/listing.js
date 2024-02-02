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
      errorHandler(401, "You are not authorized to view the listings")
    );
  }

  try {
    const listings = await LISTING.find({ userRef: req.params.id });
    if (!listings) {
      return next(errorHandler(404, "No listings found"));
    }

    res.status(200).json(listings);
  } catch (e) {
    return next(e);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const checkListing = await LISTING.findById(req.params.id);
    if (!checkListing) {
      return next(404, "Listing not found!");
    }

    if (req.user.id.toString() !== checkListing.userRef.toString()) {
      return next(
        errorHandler(401, "You are not authorized to delete the listing")
      );
    }

    await LISTING.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const getSpecificListing = async (req, res, next) => {
  try {
    const listing = await LISTING.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    res.status(200).json(listing);
  } catch (e) {
    next(e);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await LISTING.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    if (req.user.id.toString() != listing.userRef.toString()) {
      return next(
        errorHandler(401, "You are not authorized to update the listing")
      );
    }

    await LISTING.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
    });
  } catch (e) {
    next(e);
  }
};
