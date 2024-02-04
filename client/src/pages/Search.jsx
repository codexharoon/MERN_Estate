import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });
  const navigate = useNavigate();
  const [onFetchListing, setOnFetchListing] = useState({
    loading: false,
    error: null,
    errorMsg: "",
  });

  const [listings, setListings] = useState([]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
    ) {
      setSearchData({
        ...searchData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "offer" ||
      e.target.id === "parking" ||
      e.target.id === "furnished"
    ) {
      setSearchData({
        ...searchData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const [sort, order] = e.target.value.split("_");

      setSearchData({
        ...searchData,
        sort,
        order,
      });
    }

    if (e.target.id === "searchterm") {
      setSearchData({
        ...searchData,
        searchTerm: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchParams = new URLSearchParams();
    searchParams.set("searchTerm", searchData.searchTerm);
    searchParams.set("type", searchData.type);
    searchParams.set("offer", searchData.offer);
    searchParams.set("parking", searchData.parking);
    searchParams.set("furnished", searchData.furnished);
    searchParams.set("sort", searchData.sort);
    searchParams.set("order", searchData.order);

    const searchQuery = searchParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const getSearchTerm = searchParams.get("searchTerm") || "";
    const getType = searchParams.get("type") || "all";
    const getOffer = searchParams.get("offer") || false;
    const getParking = searchParams.get("parking") || false;
    const getFurnished = searchParams.get("furnished") || false;
    const getSort = searchParams.get("sort") || "createdAt";
    const getOrder = searchParams.get("order") || "desc";

    setSearchData({
      searchTerm: getSearchTerm,
      type: getType,
      offer: getOffer === "true" ? true : false,
      parking: getParking === "true" ? true : false,
      furnished: getFurnished === "true" ? true : false,
      sort: getSort,
      order: getOrder,
    });

    const fetchListings = async () => {
      setOnFetchListing({
        loading: true,
        error: false,
        errorMsg: "",
      });

      try {
        const searchQuery = searchParams.toString();
        const response = await fetch(
          `http://localhost:8888/api/listing/search?${searchQuery}`
        );
        const data = await response.json();
        if (data.success === false) {
          setOnFetchListing({
            loading: false,
            error: true,
            errorMsg: data.message,
          });
        } else {
          setListings(data);
          setOnFetchListing({
            loading: false,
            error: false,
            errorMsg: "",
          });
        }
      } catch (e) {
        setOnFetchListing({
          loading: false,
          error: true,
          errorMsg:
            "An error occurred while fetching listings. Please try again.",
        });
      }
    };

    fetchListings();
  }, [location.search]);

  return (
    <div className="flex flex-col sm:flex-row">
      <form onSubmit={handleSubmit} className="flex-2">
        <div className="p-7 flex flex-col gap-7 border-b-2 sm:border-r-2 h-auto sm:min-h-screen">
          <div className="flex items-center gap-2">
            <label htmlFor="searchterm" className="whitespace-nowrap">
              Search Term:
            </label>
            <input
              type="text"
              placeholder="Search..."
              id="searchterm"
              className="borde bg-slate-100 w-full p-3 rounded-lg"
              onChange={handleChange}
              value={searchData.searchTerm}
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2 whitespace-nowrap">
              <span>Type:</span>
              <input
                type="checkbox"
                name="type"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={searchData.type === "all"}
              />
              <label htmlFor="all">Rent & Sale</label>
            </div>

            <div className="flex gap-2 whitespace-nowrap">
              <input
                type="checkbox"
                name="type"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={searchData.type === "rent"}
              />
              <label htmlFor="rent">Rent</label>
            </div>

            <div className="flex gap-2 whitespace-nowrap">
              <input
                type="checkbox"
                name="type"
                id="sell"
                className="w-5"
                onChange={handleChange}
                checked={searchData.type === "sell"}
              />
              <label htmlFor="sell">Sell</label>
            </div>

            <div className="flex gap-2 whitespace-nowrap">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={searchData.offer}
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <span>Amenities:</span>
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={searchData.parking}
              />
              <label htmlFor="parking">Parking</label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={searchData.furnished}
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <label htmlFor="sort_order">Sort:</label>
            <select
              name="sort_order"
              id="sort_order"
              className="border p-3 rounded-lg bg-slate-100"
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
            >
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
            </select>
          </div>

          <button className="p-3 bg-slate-700 text-white text-center uppercase rounded-lg hover:opacity-95">
            search
          </button>
        </div>
      </form>

      <div className="p-7 flex-1">
        <h1 className="text-3xl font-semibold text-slate-600 border-b p-3">
          Listing Results:
        </h1>
      </div>
    </div>
  );
};

export default Search;
