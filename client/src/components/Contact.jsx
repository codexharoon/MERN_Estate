import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [onFetchListingOwner, setOnFetchListingOwner] = useState({
    loading: false,
    error: null,
    errorMsg: "",
  });

  const [listingOwner, setListingOwner] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getListingOwner = async () => {
      setOnFetchListingOwner({ loading: true, error: false, errorMsg: "" });
      try {
        const response = await fetch(
          `https://api-codexestate.vercel.app/api/user/get/${listing.userRef}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();
        if (data.success === false) {
          setOnFetchListingOwner({
            loading: false,
            error: true,
            errorMsg: data.message,
          });
        } else {
          setOnFetchListingOwner({
            loading: false,
            error: false,
            errorMsg: "",
          });
          setListingOwner(data);
        }
      } catch (e) {
        setOnFetchListingOwner({
          loading: false,
          error: true,
          errorMsg: "Something went wrong!",
        });
      }
    };

    getListingOwner();
  }, []);
  return (
    <div>
      {onFetchListingOwner.loading && !onFetchListingOwner.error && (
        <p className="text-xl text-center text-slate-800">Loading...</p>
      )}

      {onFetchListingOwner.error && (
        <p className="text-sm text-center text-red-600">
          {onFetchListingOwner.errorMsg}
        </p>
      )}

      {listingOwner && (
        <div className="mt-6 flex flex-col gap-3">
          <p>
            Contact{" "}
            <span className="font-semibold">{listingOwner.username}</span> for{" "}
            <span className="font-semibold">{listing.name}</span>
          </p>

          <textarea
            name="message"
            id="message"
            rows="2"
            className="border-2 p-3 rounded-lg"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoFocus={true}
          />

          <Link
            to={`mailto:${listingOwner.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-800 text-white text-center uppercase p-3 mt-2 w-full rounded-lg hover:opacity-95"
          >
            send message
          </Link>
        </div>
      )}
    </div>
  );
};

export default Contact;
