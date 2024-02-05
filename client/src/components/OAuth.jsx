import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await fetch(
        "https://api-codexestate.vercel.app/api/auth/google",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          }),
        }
      );

      const data = await response.json();
      dispatch(signInSuccess(data));
      if (data.success === false) {
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      type="button"
      onClick={handleOAuth}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      continue with google
    </button>
  );
};

export default OAuth;
