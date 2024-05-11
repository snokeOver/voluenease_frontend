import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import GoogleButton from "../components/shared/GoogleButton.jsx";
import GithubButton from "../components/shared/GithubButton.jsx";
import LogoWithTitle from "../components/shared/login/LogoWithTitle.jsx";
import SideSectionWithSlidder from "../components/shared/login/SideSectionWithSlidder.jsx";
import ActionButton from "../components/shared/ActionButton.jsx";
import useAuth from "../hooks/useAuth.jsx";
import useData from "../hooks/useData.jsx";

const Login = () => {
  const {
    signIn,
    googleRegister,
    githubRegister,
    logOutSuccess,
    setLogOutSuccess,
  } = useAuth();
  const { setToastMsg, setPageLoading } = useData();

  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [googleErrMsg, setGoogleErrMsg] = useState("");

  const [showPass, setShowPass] = useState(false);

  // This should handle all the changes of different fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle errors toast
  useEffect(() => {
    if (googleErrMsg) {
      setToastMsg(googleErrMsg);
    }
  }, [googleErrMsg]);

  // This should handle submission of form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPageLoading(true);
    setGoogleErrMsg("");

    signIn(formData.email, formData.password)
      .then((result) => {
        firebaseLoginSuccess(result);
      })
      .catch((err) => {
        firebaseLoginError(err);
      });
    setFormData({
      email: "",
      password: "",
    });
  };

  // This is for first render
  useEffect(() => {
    setGoogleErrMsg();
  }, []);

  // handle the Register with Google button
  const handleGoogleRegister = () => {
    googleRegister()
      .then((result) => {
        firebaseLoginSuccess(result);
      })
      .catch((err) => {
        firebaseLoginError(err);
      });
  };

  // Handle the Register with Github button
  const handleGithubRegister = () => {
    githubRegister()
      .then((result) => {
        firebaseLoginSuccess(result);
      })
      .catch((err) => {
        firebaseLoginError(err);
      });
  };

  // handle Firebase error while registering
  const firebaseLoginError = (err) => {
    console.log(err.message);
    console.log(err.code);
    if (err.code === "auth/invalid-credential") {
      setGoogleErrMsg("Either email or password is wrong  !");
    } else {
      setGoogleErrMsg(err.code);
    }
    setPageLoading(false);
  };

  // Handle All successful firebase Login
  const firebaseLoginSuccess = (result) => {
    setToastMsg("Login Successful  !");

    setPageLoading(false);
    navigate(location?.state ? location.state : "/");
  };

  // Log Out success Toast
  useEffect(() => {
    if (logOutSuccess) {
      setToastMsg("Log out successfull  !");
      setLogOutSuccess(false);
    }
  }, [logOutSuccess]);

  return (
    <>
      <Helmet>
        <title>Login | VolunEase</title>
      </Helmet>
      <div className=" container  bg-base-100 mx-auto">
        <div className="hero  rounded-xl flex flex-col md:flex-row-reverse">
          <div className="hero-content  w-full flex-col flex-1">
            <LogoWithTitle title="Login Here" />
            <div className="card w-full max-w-lg shadow-2xl bg-base-100">
              <div className="card-body">
                <div className=" flex gap-7 justify-center">
                  {/* Login with google */}

                  <div onClick={handleGoogleRegister} className="inline-block ">
                    <GoogleButton text="Login with Github" />
                  </div>
                  {/* Login with GitHub */}

                  <div onClick={handleGithubRegister} className="inline-block ">
                    <GithubButton text="Login with Github" />
                  </div>
                </div>
              </div>
              <div className="divider  mb-0 px-4">OR</div>
              <form className="card-body" onSubmit={handleFormSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Email</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 border-prime">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@domain.com"
                      value={formData.email || ""}
                      className="grow placeholder-gray-400 text-sm"
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text text-lg">Password</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 border-prime">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      placeholder="* * * * * * * * * * * *"
                      value={formData.password || ""}
                      className="grow placeholder-gray-400 text-sm"
                      onChange={handleChange}
                      required
                    />
                    <span
                      className="absolute right-5 top-[3.5rem]"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? (
                        <BsEyeSlashFill className="text-2xl cursor-pointer text-primary" />
                      ) : (
                        <BsFillEyeFill className="text-2xl cursor-pointer text-primary" />
                      )}
                    </span>
                  </label>
                </div>

                <div className="form-control mt-6">
                  <ActionButton buttonText="Login" />
                </div>
              </form>

              <label className="label  flex justify-center mb-5">
                <span className="text-sm">Don't have an account?</span>
                <Link
                  className="label-text-alt link link-hover text-blue-700 dark:text-blue-600 font-semibold ml-2"
                  to="/join"
                >
                  join Now
                </Link>
              </label>
            </div>
          </div>
          <div
            id="login_img"
            className="bg-cover h-[920px] bg-no-repeat flex flex-col gap-7 justify-center items-center flex-1 py-5"
          >
            <SideSectionWithSlidder writings="Find your dream holidy spot" />
          </div>
        </div>
      </div>
      {/* <GoToTopBtn /> */}
    </>
  );
};

export default Login;
