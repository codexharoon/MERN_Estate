import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
SwiperCore.use([Navigation]);

import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";

import { useSelector } from "react-redux";
import { Contact } from "../components";

const Listing = () => {
  const { lid } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.user);
  const [contatClicked, setContactClicked] = useState(false);

  useEffect(() => {
    const getSpecificListing = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(
          `https://api-codexestate.vercel.app/api/listing/get/${lid}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
        } else {
          setLoading(false);
          setListing(data);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getSpecificListing();
  }, []);

  return (
    <main>
      {loading && (
        <div className="text-3xl h-screen w-screen flex items-center justify-center">
          <span className="text-red-400">Loading...</span>
        </div>
      )}
      {error && (
        <div className="text-3xl text-center h-screen w-screen flex flex-col gap-3 items-center justify-center">
          <span className="text-red-400">Something Went Wrong!</span>
          <span className="text-xl">
            Please Go Back to the{" "}
            <span className="font-bold underline">
              <Link to="/">Home</Link>
            </span>{" "}
            Page.
          </span>
        </div>
      )}
      {listing && (
        <div>
          <Swiper navigation>
            {listing.imageURLs.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[300px]"
                  style={{
                    background: `url(${url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="max-w-4xl mx-auto p-3">
            <h1 className="font-semibold text-xl my-5">
              {listing.name} -{" "}
              <span>
                $ {listing.regularPrice}{" "}
                {listing.type === "rent" ? " / month" : ""}
              </span>
            </h1>
            <address className="text-green-800 flex items-center gap-2 font-normal text-sm">
              <FaMapMarkerAlt /> {listing.address}
            </address>

            <div className="my-3 flex gap-4 flex-wrap">
              <span className="p-1 w-full max-w-[200px] rounded-lg text-white text-center bg-red-800">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </span>
              {listing.offer && (
                <span className="p-1 w-full max-w-[200px] rounded-lg text-white text-center bg-green-800">
                  $ {listing.discountPrice} discount
                </span>
              )}
            </div>

            <p className="text-slate-800">
              <span className="font-semibold">Description - </span>
              {listing.description}
            </p>

            <ul className="flex items-center gap-4 my-3 flex-wrap">
              <li className="flex items-center gap-1 text-green-800 flex-nowrap whitespace-nowrap font-semibold">
                <FaBed />
                <span>
                  {listing.bedrooms} {listing.bedrooms > 1 ? "Beds" : "Bed"}
                </span>
              </li>
              <li className="flex items-center gap-1 text-green-800 flex-nowrap whitespace-nowrap font-semibold">
                <FaBath />
                <span>
                  {listing.bathrooms} {listing.bathrooms > 1 ? "Baths" : "Bath"}
                </span>
              </li>
              <li className="flex items-center gap-1 text-green-800 flex-nowrap whitespace-nowrap font-semibold">
                <FaParking />
                <span>{listing.parking ? "Parking" : "No Parking"}</span>
              </li>
              <li className="flex items-center gap-1 text-green-800 flex-nowrap whitespace-nowrap font-semibold">
                <FaChair />
                <span>{listing.furnished ? "Furnished" : "No Furnished"}</span>
              </li>
            </ul>

            {!contatClicked && user && user._id !== listing.userRef && (
              <button
                onClick={() => setContactClicked(true)}
                className="bg-slate-800 text-white text-center p-3 mt-2 w-full rounded-lg hover:opacity-95"
              >
                Contact Landlord
              </button>
            )}

            {contatClicked && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
