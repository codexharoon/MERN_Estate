import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";

const CreateListing = () => {
  const [listingData, setListingData] = useState({ imageURLs: [] });
  const [images, setImages] = useState([]);
  const [onImagesUpload, setOnImagesUpload] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });

  const handleUploadImages = () => {
    setOnImagesUpload({ loading: true, error: false, errorMsg: "" });

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

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7 text-red-400">
        Create a Listing
      </h1>
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

          <button className="p-3 uppercase rounded-lg bg-red-400 text-white hover:opacity-95 disabled:opacity-80">
            create listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
