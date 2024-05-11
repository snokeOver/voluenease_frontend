import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import PrimaryButton from "../components/shared/PrimaryButton";
const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found | VolunEase</title>
      </Helmet>
      <div className=" xl:my-20 container bg-base-100 mx-auto p-5 md:p-10 min-h-screen">
        <div className="hero py-10 rounded-lg bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold ">
                <img src="https://i.ibb.co/cY9kysS/404.png" alt="" />
                <p className="playfair-font -mt-10">Not Found</p>
              </h1>
              <p className="py-6">
                The page your are looking for was not found!
              </p>

              <NavLink to="/">
                <PrimaryButton textField="Go Home" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
