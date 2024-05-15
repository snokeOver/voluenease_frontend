import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPhoneAlt, FaLocationArrow } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import useData from "../../hooks/useData";
import SocialLinks from "../shared/SocialLinks";
import SiteLogo from "../shared/SiteLogo";

const Footer = () => {
  const { toastMsg, setToastMsg, currTheme } = useData();
  useEffect(() => {
    if (toastMsg) {
      toast(toastMsg, {
        position: "bottom-center",
      });
    }
    setToastMsg("");
  }, [toastMsg]);
  return (
    <footer className=" p-10 bg-blue-100 dark:bg-base-100 text-base-content rounded-t-[2rem] md:rounded-t-[3rem] lg:rounded-t-[3.5rem] border-t-[1px] border-primary ">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 ">
        <div className="footer flex md:justify-center">
          <nav>
            <h6 className="footer-title">Organization</h6>

            <NavLink className="link link-hover" to="/about">
              About Us
            </NavLink>
            <NavLink className="link link-hover" to="/contact">
              Contact
            </NavLink>
            <NavLink className="link link-hover" to="#">
              Testimony
            </NavLink>
            <NavLink className="link link-hover" to="#">
              Terms of use
            </NavLink>
          </nav>
        </div>
        <div className="footer flex md:justify-center">
          <nav>
            <h6 className="footer-title">Quick Links</h6>

            <NavLink className="link link-hover" to="/manage-posts">
              My Requests
            </NavLink>
            <NavLink className="link link-hover" to="/manage-posts">
              My Posts
            </NavLink>
            <NavLink className="link link-hover" to="/user-profile">
              Profile
            </NavLink>
            <NavLink className="link link-hover" to="#">
              Promotions
            </NavLink>
          </nav>
        </div>
        <div className="footer flex md:justify-center">
          <nav>
            <h6 className="footer-title">Newsletter</h6>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="input border-t-0 border-l-0 border-r-0 border-b  input-bordered   border-primary input-md w-full max-w-xs"
            />
            <div className="relative">
              <input
                name="email"
                type="email"
                placeholder="Email . . . "
                className="input border-t-0 border-l-0 border-r-0 border-b  input-bordered   border-primary input-md w-full max-w-xs "
              />
              <FaLocationArrow className=" cursor-pointer text-lg absolute text-primary right-5 bottom-4 sm:right-20 md:right-5 " />
            </div>
          </nav>
        </div>
      </div>
      <div className="divider py-10"></div>
      {/* Last part */}
      <div className="footer footer-center">
        <div className="flex flex-col-reverse md:flex-row gap-10 justify-between  w-full">
          {/* Logo and Site Name part */}
          <aside>
            <div className="mb-3 ">
              <Link
                to="/"
                className="text-3xl font-semibold font-rubik flex justify-center flex-col items-center gap-2"
              >
                <div>
                  <img
                    src="https://i.ibb.co/LQy37MK/logoV.png"
                    alt=""
                    className="w-12"
                  />
                </div>
                <SiteLogo />
              </Link>
            </div>
          </aside>
          {/* Address part */}
          <aside>
            <div className="footer flex md:justify-center">
              <nav className="flex flex-col items-center">
                <div>
                  <a className=" cursor-pointer  flex items-center gap-2 mb-1">
                    <FaPhoneAlt className="text-primary" />
                    <span className="hover:text-primary">
                      +(880) 15171-66682
                    </span>
                  </a>
                  <a className=" cursor-pointer  flex items-center gap-2">
                    <MdEmail className="text-primary" />
                    <span className="hover:text-primary">
                      snokeover@gmail.com
                    </span>
                  </a>
                </div>
                <div>
                  <SocialLinks />
                </div>
              </nav>
            </div>
          </aside>
        </div>
        {/* Copy Write part */}
        <aside className="text-xs">
          <p>© VolunEase - {new Date().getFullYear()} - All right reserved</p>
        </aside>
      </div>
      <ToastContainer theme={currTheme} autoClose={2600} />
    </footer>
  );
};

export default Footer;
