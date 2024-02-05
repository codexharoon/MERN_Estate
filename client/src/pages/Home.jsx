import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
SwiperCore.use([Navigation]);

const Home = () => {
  const [recentListing, setRecentListing] = useState([]);

  useEffect(() => {
    // Fetch recent listings
    const fetchRecentListings = async () => {
      try {
        const response = await fetch(
          "http://localhost:8888/api/listing/search?limit=4&offer=true"
        );
        const data = await response.json();
        setRecentListing(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecentListings();
  }, []);
  return (
    <div>
      <div className="mt-16 p-7 flex flex-col gap-6">
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

      <div className="mt-16">
        <Swiper navigation>
          {recentListing &&
            recentListing.length > 0 &&
            recentListing.map((listing) => (
              <SwiperSlide>
                <div
                  style={{
                    background: `url(${listing.imageURLs[0]})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "400px",
                  }}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
