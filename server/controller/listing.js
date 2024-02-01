import LISTING from "../models/listing.js";

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
