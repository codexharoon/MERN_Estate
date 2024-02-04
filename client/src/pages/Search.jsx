import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <form className="flex-2">
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
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2 whitespace-nowrap">
              <span>Type:</span>
              <input type="checkbox" name="type" id="all" className="w-5" />
              <label htmlFor="all">Rent & Sale</label>
            </div>

            <div className="flex gap-2 whitespace-nowrap">
              <input type="checkbox" name="type" id="rent" className="w-5" />
              <label htmlFor="rent">Rent</label>
            </div>

            <div className="flex gap-2 whitespace-nowrap">
              <input type="checkbox" name="type" id="sell" className="w-5" />
              <label htmlFor="sell">Sell</label>
            </div>

            <div className="flex gap-2 whitespace-nowrap">
              <input type="checkbox" name="offer" id="offer" className="w-5" />
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
              />
              <label htmlFor="parking">Parking</label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
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
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="hprice">Price high to low</option>
              <option value="lprice">Price low to high</option>
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
