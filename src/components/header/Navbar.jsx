import { NavLink, useLocation } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import ButtonSpinner from "../shared/ButtonSpinner";
import useAuth from "../../hooks/useAuth";
import useData from "../../hooks/useData";
import useLogOut from "../../hooks/useLogOut";
import RingLoading from "../shared/RingLoading";
import SiteLogo from "../shared/SiteLogo";

const Navbar = () => {
  const { user, loading } = useAuth();
  const { pageLoading } = useData();
  const logOut = useLogOut();

  const { pathname } = useLocation();

  // Handle LogOut operation
  const handleLogOut = () => {
    logOut();
  };

  // All the navlinks
  const navItems = (
    <>
      <li className="relative">
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "text-indigo-500" : "hover:text-prime"} mr-1 `
          }
          to="/"
        >
          Home
        </NavLink>
        {pathname === "/" ? (
          <div className=" absolute w-full h-[1.3px] py-0 rounded-none bg-prime -bottom-3 hover:bg-prime"></div>
        ) : null}
      </li>
      <li>
        <details>
          <summary>Company</summary>
          <ul className="p-2 rounded-t-none rounded-b-md">
            <li className="relative">
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "text-prime" : "hover:text-prime"} mr-1 `
                }
                to="/about"
              >
                About
              </NavLink>
              {pathname === "/about" ? (
                <div className=" absolute w-full h-[1.3px] py-0 rounded-none bg-prime -bottom-3 hover:bg-prime"></div>
              ) : null}
            </li>
            <li className="relative">
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "text-prime" : "hover:text-prime"} mr-1 `
                }
                to="/branches"
              >
                Branches
              </NavLink>
              {pathname === "/branches" ? (
                <div className=" absolute w-full h-[1.3px] py-0 rounded-none bg-prime -bottom-3 hover:bg-prime"></div>
              ) : null}
            </li>
            <li className="relative">
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "text-prime" : "hover:text-prime"} mr-1 `
                }
                to="/contact"
              >
                Contact
              </NavLink>
              {pathname === "/contact" ? (
                <div className=" absolute w-full h-[1.3px] py-0 rounded-none bg-prime -bottom-3 hover:bg-prime"></div>
              ) : null}
            </li>
          </ul>
        </details>
      </li>

      <li className="relative">
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "text-prime" : "hover:text-prime"} mr-1 `
          }
          to="/need-volunteer"
        >
          Need Volunteer
        </NavLink>
        {pathname === "/need-volunteer" ? (
          <div className=" absolute w-full h-[1.3px] py-0 rounded-none bg-prime -bottom-3 hover:bg-prime"></div>
        ) : null}
      </li>

      {loading || pageLoading ? (
        <RingLoading />
      ) : (
        <>
          {user && (
            <>
              <li>
                <details>
                  <summary>My Profile</summary>
                  <ul className="p-2 rounded-t-none rounded-b-md">
                    <li className="relative">
                      <NavLink
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-prime" : "hover:text-prime"
                          } mr-1 `
                        }
                        to="/add-post"
                      >
                        Add Post
                      </NavLink>
                      {pathname === "/add-post" ? (
                        <div className=" absolute w-full h-[1.3px] py-0 rounded-none bg-prime -bottom-3 hover:bg-prime"></div>
                      ) : null}
                    </li>
                    <li className="relative">
                      <NavLink
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-prime" : "hover:text-prime"
                          } mr-1 `
                        }
                        to="/manage-posts"
                      >
                        Manage Posts
                      </NavLink>
                      {pathname === "/manage-posts" ? (
                        <div className=" absolute w-full h-[1.3px] py-0 rounded-none bg-prime -bottom-3 hover:bg-prime"></div>
                      ) : null}
                    </li>
                  </ul>
                </details>
              </li>
            </>
          )}
        </>
      )}
    </>
  );

  return (
    <div className="navbar py-0">
      {/* Start part */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        {/* Logo Part */}
        <div>
          <NavLink
            className="text-3xl font-semibold font-rubik flex items-center"
            to="/"
          >
            <img
              src="https://i.ibb.co/LQy37MK/logoV.png"
              alt=""
              className="w-12"
            />

            <div className="hidden md:flex ">
              <SiteLogo />
            </div>
          </NavLink>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        <div className="mr-2">
          <ThemeButton />
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="mr-3 cursor-pointer">
            <div className="indicator">
              <img src="/icons/bag.svg" className="h-6 w-6" alt="" />
              <span className="badge badge-sm indicator-item text-prime">
                8
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-200 shadow"
          >
            <div className="card-body">
              <span className="font-bold rounded-full text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn py-1   rounded-md text-prime border-prime bg-none hover:bg-prime hover:text-gray-100  btn-block">
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mr-2 cursor-pointer">
          <img src="/icons/search.svg" alt="" />
        </div>

        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mr-2"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="profile Picture"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow w-52 bg-base-200 rounded-lg"
              >
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-prime border-b border-prime"
                          : "hover:text-prime"
                      } mr-1 rounded-md`
                    }
                    to="/profile"
                  >
                    Profile
                    <span className="badge">New</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-prime border-b border-prime"
                          : "hover:text-prime"
                      } mr-1 rounded-md`
                    }
                    to="/settings"
                  >
                    Settings
                  </NavLink>
                </li>
                <li onClick={handleLogOut}>
                  <a>{pageLoading && <ButtonSpinner />} Logout</a>
                </li>
              </ul>
            </div>
            <NavLink to="/appointment">
              <button className="btn py-2  md:py-3 md:px-7 rounded-sm text-prime border-prime bg-none hover:bg-prime hover:text-gray-100 ">
                Appointment
              </button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/join" className="mr-3">
              <button className=" p-0 text-prime bg-transparent  hover:text-sky-700 dark:hover:text-gray-100 dark:hover:border-indigo-500">
                Join
              </button>
            </NavLink>
            <NavLink to="/login">
              <button className="btn  py-2  md:py-3 md:px-7 rounded-sm text-gray-100  border-none bg-prime hover:bg-sky-300 hover:text-sky-600 dark:hover:bg-gray-200 dark:hover:text-prime">
                Login
              </button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
