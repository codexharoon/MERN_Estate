import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmitSearch = (e) => {
    e.preventDefault();

    const searchParams = new URLSearchParams();
    searchParams.set("searchTerm", searchTerm);

    const searchQuery = searchParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const getSearchTerm = searchParams.get("searchTerm");

    setSearchTerm(getSearchTerm || "");
  }, [location.search]);
  return (
    <header className="bg-slate-200 shadow-md">
      <nav className="flex justify-between items-center max-w-4xl mx-auto p-3">
        <h1 className="text-sm sm:text-xl font-bold cursor-pointer flex flex-wrap">
          <span className="text-slate-700">
            Code<span className="text-slate-400">x</span>
          </span>
          <span className="text-red-400">Estate</span>
        </h1>

        <form
          onSubmit={handleSubmitSearch}
          className="bg-slate-100 p-2 rounded-md flex items-center justify-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none text-sm focus:outline-none w-20 sm:w-60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-red-300" />
          </button>
        </form>

        <ul className="flex gap-4 text-slate-700">
          <li className="hidden sm:inline">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "text-red-400 font-bold" : "text-black font-normal"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li className="hidden sm:inline">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${
                  isActive ? "text-red-400 font-bold" : "text-black font-normal"
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            {user ? (
              <NavLink to="/profile">
                <img
                  src={user.photo}
                  alt="user profile picture"
                  className="h-7 w-7 rounded-full object-cover"
                />
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-red-400 font-bold"
                      : "text-black font-normal"
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
