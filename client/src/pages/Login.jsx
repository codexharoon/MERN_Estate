import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const { error, errorMsg, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch(
        "https://api-codexestate.vercel.app/api/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (err) {
      dispatch(signInFailure("Something went wrong! Please try again."));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold my-6">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          required
          onChange={handleChange}
          className="p-3 bg-slate-100 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          required
          onChange={handleChange}
          className="p-3 bg-slate-100 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
        >
          {loading ? "Login..." : "Login"}
        </button>
        <OAuth />
      </form>

      <div className="mt-5">
        <p>
          Do not have an account?{" "}
          <span className="text-blue-500">
            <Link to="/signup">Signup</Link>
          </span>
        </p>
      </div>

      <p className="text-red-700 mt-5">{error ? `${errorMsg}` : ""}</p>
    </div>
  );
};

export default Login;
