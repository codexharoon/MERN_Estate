import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [listingData, setListingData] = useState({
    imageURLs: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
  });

  const [images, setImages] = useState([]);
  const [onImagesUpload, setOnImagesUpload] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });

  const [onCreateListing, setOnCreateListing] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });

  const handleUploadImages = () => {
    setOnImagesUpload({ loading: true, error: false, errorMsg: "" });

    if (images.length === 0)
      return setOnImagesUpload({
        loading: false,
        error: true,
        errorMsg: "PLease select at least one image!",
      });

    if (images.length > 0 && images.length + listingData.imageURLs.length < 7) {
      const promises = [];

      for (let i = 0; i < images.length; i++) {
        promises.push(uploadImage(images[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setOnImagesUpload({ loading: false, error: false, errorMsg: "" });
          setListingData({
            ...listingData,
            imageURLs: listingData.imageURLs.concat(urls),
          });
        })
        .catch((error) => {
          setOnImagesUpload({
            loading: false,
            error: true,
            errorMsg:
              "Error to upload images!, (Files should be an *image and less than *5MB (*Max 6) )",
          });
        });
    } else {
      setOnImagesUpload({
        loading: false,
        error: true,
        errorMsg:
          "Error to upload images!, (Files should be an *image and less than *5MB (*Max 6) )",
      });
    }
  };

  const uploadImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = Math.random() * 1000000 + image.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => resolve(url));
        }
      );
    });
  };

  const handleDeleteImage = (index) => {
    setListingData({
      ...listingData,
      imageURLs: listingData.imageURLs.filter((url, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setListingData({
        ...listingData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setListingData({
        ...listingData,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.type === "number") {
      setListingData({
        ...listingData,
        [e.target.id]: e.target.value === "" ? "" : Number(e.target.value),
      });
    }

    if (e.target.type === "text" || e.target.type === "textarea") {
      setListingData({
        ...listingData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOnCreateListing({ loading: true, error: false, errorMsg: "" });

    if (images.length === 0 || listingData.imageURLs.length === 0)
      return setOnCreateListing({
        loading: false,
        error: true,
        errorMsg: "Please upload at least one image!",
      });
    if (listingData.discountPrice > listingData.regularPrice)
      return setOnCreateListing({
        loading: false,
        error: true,
        errorMsg: "Discount price can't be greater than regular price!",
      });

    try {
      const res = await fetch("http://localhost:8888/api/listing/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...listingData, userRef: user._id }),
      });

      const data = await res.json();

      if (data.success === false) {
        setOnCreateListing({
          loading: false,
          error: true,
          errorMsg: data.message,
        });
      } else {
        setOnCreateListing({
          loading: false,
          error: false,
          errorMsg: "",
        });
        navigate(`/listing/${data.data._id}`);
      }
    } catch (error) {
      setOnCreateListing({
        loading: false,
        error: true,
        errorMsg: "Something went wrong!",
      });
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7 text-red-400">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-4 flex-col sm:flex-row">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              id="name"
              required
              minLength={3}
              onChange={handleChange}
              className="p-3 border rounded-lg bg-slate-100"
            />
            <textarea
              type="text"
              placeholder="Description"
              id="description"
              required
              minLength={3}
              onChange={handleChange}
              className="p-3 border rounded-lg bg-slate-100"
            />
            <input
              type="text"
              placeholder="Address"
              id="address"
              required
              minLength={3}
              onChange={handleChange}
              className="p-3 border rounded-lg bg-slate-100"
            />
          </div>

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="type"
                id="sell"
                onChange={handleChange}
                checked={listingData.type === "sell"}
                className="w-5"
              />
              <label htmlFor="sell">Sell</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="type"
                id="rent"
                onChange={handleChange}
                checked={listingData.type === "rent"}
                className="w-5"
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                onChange={handleChange}
                checked={listingData.parking}
                className="w-5"
              />
              <label htmlFor="parking">Parking spot</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                onChange={handleChange}
                checked={listingData.furnished}
                className="w-5"
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                onChange={handleChange}
                checked={listingData.offer}
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
                onChange={handleChange}
                value={listingData.bedrooms}
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
                onChange={handleChange}
                value={listingData.bathrooms}
                id="bathrooms"
                required
                className="p-3 border rounded-lg bg-slate-100"
              />
              <label htmlFor="bathrooms">Baths</label>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={1}
                max={1000000}
                onChange={handleChange}
                value={listingData.regularPrice}
                id="regularPrice"
                required
                className="p-3 border rounded-lg bg-slate-100"
              />
              <div className="flex flex-col gap-0">
                <label htmlFor="regularPrice">Regular price</label>
                {listingData.type === "rent" && (
                  <span className="text-xs text-center text-slate-700">
                    ($ /Month)
                  </span>
                )}
              </div>
            </div>

            {listingData.offer && (
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min={0}
                  max={1000000}
                  onChange={handleChange}
                  value={listingData.discountPrice}
                  id="discountPrice"
                  className="p-3 border rounded-lg bg-slate-100"
                />
                <div className="flex flex-col gap-0">
                  <label htmlFor="discountPrice">Discount price</label>
                  {listingData.type === "rent" && (
                    <span className="text-xs text-center text-slate-700">
                      ($ /Month)
                    </span>
                  )}
                </div>
              </div>
            )}
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
              className="p-3 border-2 border-red-400 rounded-lg border-dashed"
              id="images"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
            />
            <button
              type="button"
              disabled={onImagesUpload.loading}
              onClick={handleUploadImages}
              className="p-4 rounded-lg uppercase text-green-700 border border-green-700 hover:shadow-lg disabled:opacity-80"
            >
              {onImagesUpload.loading ? "Uploading..." : "Upload"}
            </button>
          </div>

          <span className="text-center text-red-400 text-xs">
            {onImagesUpload.error ? onImagesUpload.errorMsg : ""}
          </span>

          {listingData.imageURLs.length > 0 &&
            listingData.imageURLs.map((url, index) => (
              <div
                key={url + index}
                className="border p-3 flex justify-between items-center rounded-lg"
              >
                <img
                  src={url}
                  alt="listing images"
                  className="w-16 h-16 rounded-lg object-contain"
                />
                <button
                  type="button"
                  className="uppercase text-red-700 p-3 hover:opacity-80"
                  onClick={() => handleDeleteImage(index)}
                >
                  delete
                </button>
              </div>
            ))}

          <button
            disabled={onCreateListing.loading || onImagesUpload.loading}
            className="p-3 uppercase rounded-lg bg-red-400 text-white hover:opacity-95 disabled:opacity-80"
          >
            {onCreateListing.loading ? "Creating..." : "Create listing"}
          </button>
          <span className="text-center text-red-400 text-sm">
            {onCreateListing.error ? onCreateListing.errorMsg : ""}
          </span>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
