import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
SwiperCore.use([Navigation]);
import { ListingCard } from "../components";

const Home = () => {
  const [recentListing, setRecentListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);

  useEffect(() => {
    // Fetch recent offer listings
    const fetchRecentListings = async () => {
      try {
        const response = await fetch(
          "https://api-codexestate.vercel.app/api/listing/search?limit=4&offer=true"
        );
        const data = await response.json();
        setRecentListing(data);
        fetchRentListings();
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecentListings();

    // Fetch recent rent listings
    const fetchRentListings = async () => {
      try {
        const response = await fetch(
          "https://api-codexestate.vercel.app/api/listing/search?limit=4&type=rent"
        );
        const data = await response.json();
        setRentListing(data);
        fetchSaleListings();
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch recent sale listings
    const fetchSaleListings = async () => {
      try {
        const response = await fetch(
          "https://api-codexestate.vercel.app/api/listing/search?limit=4&type=sell"
        );
        const data = await response.json();
        setSaleListing(data);
      } catch (error) {
        console.error(error);
      }
    };
  }, []);
  return (
    <div>
      <div className="mt-16 flex flex-col gap-6 max-w-6xl mx-auto">
        <h1 className="font-bold text-3xl md:text-6xl text-slate-600">
          Find your next <span className="text-red-400">perfect</span>
          <br />
          place with ease
        </h1>

        <p className="text-sm text-gray-400 line-clamp-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit fuga
          magni repudiandae, ullam voluptatibus dolorum sequi numquam iusto
          minima reprehenderit voluptatibus at quo reiciendis?
        </p>

        <Link to="/search" className="text-blue-700 font-bold">
          Lets Satrt now...
        </Link>
      </div>

      {recentListing && recentListing.length > 0 && (
        <div className="mt-16">
          <Swiper navigation>
            {recentListing &&
              recentListing.length > 0 &&
              recentListing.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div
                    style={{
                      background: `url(${listing.imageURLs[0]})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "400px",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}

      {recentListing && recentListing.length > 0 && (
        <div className="p-3 mt-10 max-w-6xl mx-auto">
          <h2 className="text-2xl text-slate-600 font-semibold">
            Recent offers
          </h2>
          <Link
            to={"/search?offer=true"}
            className="text-blue-800 text-sm hover:underline"
          >
            Show more offers
          </Link>

          <div className="flex flex-wrap gap-4 py-3">
            {recentListing &&
              recentListing.length > 0 &&
              recentListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
          </div>
        </div>
      )}

      {rentListing && (
        <div className="p-3 mt-10 max-w-6xl mx-auto">
          <h2 className="text-2xl text-slate-600 font-semibold">
            Recent places for rent
          </h2>
          <Link
            to={"/search?type=rent"}
            className="text-blue-800 text-sm hover:underline"
          >
            Show more places for rent
          </Link>

          <div className="flex flex-wrap gap-4 py-3">
            {rentListing &&
              rentListing.length > 0 &&
              rentListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
          </div>
        </div>
      )}

      {saleListing && (
        <div className="p-3 mt-10 max-w-6xl mx-auto">
          <h2 className="text-2xl text-slate-600 font-semibold">
            Recent places for sale
          </h2>
          <Link
            to={"/search?type=sell"}
            className="text-blue-800 text-sm hover:underline"
          >
            Show more places for sale
          </Link>

          <div className="flex flex-wrap gap-4 py-3">
            {saleListing &&
              saleListing.length > 0 &&
              saleListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
