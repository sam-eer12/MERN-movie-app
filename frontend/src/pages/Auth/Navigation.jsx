import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="container mx-auto px-4">
        <section className="flex justify-between items-center py-4">
          {/* Section 1 */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-teal-400 transition-colors"
            >
              <AiOutlineHome size={26} />
              <span className="text-lg font-medium">Home</span>
            </Link>

            <Link
              to="/movies"
              className="flex items-center space-x-2 text-white hover:text-teal-400 transition-colors"
            >
              <MdOutlineLocalMovies size={26} />
              <span className="text-lg font-medium">Movies</span>
            </Link>
          </div>

          {/* Section 2 */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 text-white hover:text-teal-400 transition-colors focus:outline-none"
            >
              {userInfo ? (
                <span className="text-lg font-medium">{userInfo.username}</span>
              ) : (
                <></>
              )}

              {userInfo && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
                    dropdownOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
              )}
            </button>

            {dropdownOpen && userInfo && (
              <ul className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                {userInfo.isAdmin && (
                  <li>
                    <Link
                      to="/admin/movies/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}

                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}

            {!userInfo && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-white hover:text-teal-400 transition-colors"
                >
                  <AiOutlineLogin size={26} />
                  <span className="text-lg font-medium">Login</span>
                </Link>

                <Link
                  to="/register"
                  className="flex items-center space-x-2 text-white hover:text-teal-400 transition-colors"
                >
                  <AiOutlineUserAdd size={26} />
                  <span className="text-lg font-medium">Register</span>
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Navigation;
