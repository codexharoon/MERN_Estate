import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OAuth } from "../components";

const Signup = () => {
  const [signUpData, setSignUpData] = useState({});
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const response = await fetch("http://localhost:8888/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      const data = await response.json();

      if (data.success === false) {
        setError(true);
        setErrorMsg(data.message);
        setLoading(false);
      } else {
        setLoading(false);
        navigate("/login");
      }
    } catch (err) {
      setError(true);
      setErrorMsg("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold my-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          required
          onChange={handleChange}
          className="p-3 bg-slate-100 rounded-lg"
        />
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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <OAuth />
      </form>

      <div className="mt-5">
        <p>
          Have an account?{" "}
          <span className="text-blue-500">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>

      <p className="text-red-700 mt-5">{error ? errorMsg : ""}</p>
    </div>
  );
};

export default Signup;
