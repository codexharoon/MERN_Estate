import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import SwiperCore from "swiper";
SwiperCore.use([Navigation]);

const Listing = () => {
  const { lid } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSpecificListing = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8888/api/listing/get/${lid}`,
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
          <h1>{listing.name}</h1>
          <p>{listing.description}</p>
        </div>
      )}
    </main>
  );
};

export default Listing;
