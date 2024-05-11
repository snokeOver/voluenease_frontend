import { NavLink, useLocation } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import useAuth from "../../hooks/useAuth";
import useData from "../../hooks/useData";
import useLogOut from "../../hooks/useLogOut";
import RingLoading from "../shared/RingLoading";
import SiteLogo from "../shared/SiteLogo";
import { useState } from "react";

const Navbar = () => {
  const { user, loading } = useAuth();
  const { pageLoading } = useData();
  const logOut = useLogOut();

  const { pathname } = useLocation();
  const [isHovering, setIsHovering] = useState(false);

  const fallbackPPUrl = "https://i.ibb.co/vxg6nY4/user.png";

  // fallback for Profile image to show default image
  const handleImageError = (event) => {
    event.target.src = "https://i.ibb.co/vxg6nY4/user.png";
  };

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
            `${isActive ? "text-prime" : "hover:text-prime"} mr-1 `
          }
          to="/"
        >
          Home
        </NavLink>
        {pathname === "/" ? (
          <div className=" absolute w-full h-[1px] lg:h-[1.3px] bottom-0 lg:-bottom-[14px] py-0 rounded-none bg-prime  hover:bg-prime"></div>
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
                <div className="absolute w-full h-[1px]  py-0 rounded-none bg-prime bottom-0  hover:bg-prime"></div>
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
                <div className="absolute w-full h-[1px]  py-0 rounded-none bg-prime bottom-0  hover:bg-prime"></div>
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
                <div className="absolute w-full h-[1px]  py-0 rounded-none bg-prime bottom-0  hover:bg-prime"></div>
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
          <div className=" absolute w-full h-[1px] lg:h-[1.3px] py-0 rounded-none bg-prime bottom-0 lg:-bottom-[14px] hover:bg-prime"></div>
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
                        to="/add-volunteer-post"
                      >
                        Add Post
                      </NavLink>
                      {pathname === "/add-volunteer-post" ? (
                        <div className="absolute w-full h-[1px]  py-0 rounded-none bg-prime bottom-0  hover:bg-prime"></div>
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
                        <div className="absolute w-full h-[1px]  py-0 rounded-none bg-prime bottom-0  hover:bg-prime"></div>
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

            <div className="hidden md:flex "></div>
          </NavLink>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      {/* Navbar End */}
      <div className="navbar-end">
        <ThemeButton />
        {loading || pageLoading ? (
          <RingLoading />
        ) : user ? (
          <>
            {/* New avatar */}
            <div className="dropdown dropdown-end ml-1">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div
                  className="w-8 rounded-full"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <img
                    alt="User Photo"
                    src={user.photoURL || fallbackPPUrl}
                    onError={handleImageError}
                  />
                  {isHovering && (
                    <div className="absolute  -top-4 text-xs  z-10">
                      <h3> {user.displayName}</h3>
                    </div>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <div className="flex flex-col gap-1 text-xs ml-3">
                  <h3> {user.displayName}</h3>
                  <h3 className="mt-1"> {user.email || "<Private_Email>"}</h3>
                </div>
                <div className="divider my-1"></div>

                <li>
                  <NavLink
                    to="/user-profile"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-prime border-b border-prime"
                          : "hover:text-prime "
                      } w-full justify-between`
                    }
                  >
                    Profile <span className="badge">New</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-prime border-b border-prime"
                          : "hover:text-prime "
                      } w-full justify-between`
                    }
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                    <span className="badge">10</span>
                  </NavLink>
                </li>
                <li
                  onClick={handleLogOut}
                  className="bg-sky-400 hover:bg-sky-600 text-gray-100 rounded-2xl"
                >
                  <a>Logout</a>
                </li>
              </ul>
            </div>
            <a
              onClick={handleLogOut}
              className="btn border bg-transparent hover:bg-transparent  hover:border-prime hover:text-sky-800 dark:hover:text-gray-100 border-prime py-2 px-3 rounded-sm  text-prime btn-sm ml-2"
            >
              Logout
            </a>
          </>
        ) : (
          <>
            <NavLink to="/join" className="mx-2">
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
