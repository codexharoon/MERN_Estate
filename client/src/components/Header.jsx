import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-300">
      <nav className="flex justify-between max-w-4xl mx-auto p-3">
        <h1 className="text-xl font-bold cursor-pointer">Code x Estate</h1>
        <ul className="flex gap-4">
          <li>
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
          <li>
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
