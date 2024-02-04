import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const ListingCard = ({ listing }) => {
  return (
    <div className="w-full sm:w-[320px] overflow-hidden rounded-lg bg-slate-100 shadow-md hover:shadow-lg">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageURLs[0]}
          alt="listing cover image"
          className="h-[320px] sm:h-[220px] hover:scale-105 transition-all duration-300 ease-in-out"
        />

        <div className="mt-3 p-3">
          <h2 className="font-semibold capitalize truncate">{listing.name}</h2>
          <address className="text-xs flex gap-2 mt-1 text-green-700 items-center capitalize">
            <FaMapMarkerAlt />
            {listing.address}
          </address>
          <p className="text-sm mt-2 text-slate-700 line-clamp-2">
            {listing.description}
          </p>

          <p className="text-slate-600 mt-3">
            $
            {listing.type === "rent"
              ? `${listing.regularPrice.toLocaleString("en-US")} / month`
              : listing.regularPrice.toLocaleString("en-US")}
          </p>

          <div className="flex gap-4 text-xs mt-2 font-bold">
            <span>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds`
                : `${listing.bedrooms} Bed`}
            </span>
            <span>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths`
                : `${listing.bathrooms} Bath`}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
