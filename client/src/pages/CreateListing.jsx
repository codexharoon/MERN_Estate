import React from "react";

const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Create a Listing</h1>
      <form className="flex gap-4 flex-col sm:flex-row">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              id="name"
              required
              className="p-3 border rounded-lg bg-slate-100"
            />
            <textarea
              type="text"
              placeholder="Description"
              id="description"
              required
              className="p-3 border rounded-lg bg-slate-100"
            />
            <input
              type="text"
              placeholder="Address"
              id="address"
              required
              className="p-3 border rounded-lg bg-slate-100"
            />
          </div>

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="type"
                id="sell"
                required
                className="w-5"
              />
              <label htmlFor="sell">Sell</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="type"
                id="rent"
                required
                className="w-5"
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                required
                className="w-5"
              />
              <label htmlFor="parking">Parking spot</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                required
                className="w-5"
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                required
                className="w-5"
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={1}
                max={10}
                defaultValue={1}
                id="bedrooms"
                required
                className="p-3 border rounded-lg bg-slate-100"
              />
              <label htmlFor="bedrooms">Beds</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={1}
                max={10}
                defaultValue={1}
                id="bathrooms"
                required
                className="p-3 border rounded-lg bg-slate-100"
              />
              <label htmlFor="bedrooms">Baths</label>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={1}
                max={1000000}
                id="regularprice"
                required
                className="p-3 border rounded-lg bg-slate-100"
              />
              <div className="flex flex-col gap-0">
                <label htmlFor="bedrooms">Regular price</label>
                <span className="text-xs text-center text-slate-700">
                  ($ /Month)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <p className="text-slate-600">
            <span className="font-bold">Images:</span> The first image will be
            the cover (max 6)
          </p>

          <div className="flex items-center gap-4">
            <input
              type="file"
              className="p-3 border"
              id="images"
              multiple
              accept="image/*"
            />
            <button className="p-4 rounded-lg uppercase text-green-700 border border-green-700 hover:shadow-lg disabled:opacity-80">
              upload
            </button>
          </div>
          <button className="p-3 uppercase rounded-lg bg-slate-700 text-white hover:opacity-95 disabled:opacity-80">
            create listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
