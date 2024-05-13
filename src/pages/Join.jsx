import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import useAuth from "../hooks/useAuth.jsx";
import useData from "../hooks/useData.jsx";
import LogoWithTitle from "../components/shared/login/LogoWithTitle.jsx";
import SpinnerAtButton from "../components/shared/SpinnerAtButton.jsx";
import GoogleButton from "../components/shared/GoogleButton.jsx";
import GithubButton from "../components/shared/GithubButton.jsx";
import SideSectionWithSlidder from "../components/shared/login/SideSectionWithSlidder.jsx";
import ActionButton from "../components/shared/ActionButton.jsx";

const Join = () => {
  const {
    register,
    updateUser,
    googleRegister,
    setRegiSuccess,
    githubRegister,
  } = useAuth();
  const { setToastMsg, setPageLoading } = useData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState({
    nameErrMsg: "",
    emailErrMsg: "",
    photoUrlErrMsg: "",
    passwordErrMsg: "",
    checkErrMsg: "",
    googleErrMsg: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // This should handle all the changes of different fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to reset all error message
  const resetErrMsg = () => {
    setErrMsg({
      nameErrMsg: "",
      emailErrMsg: "",
      photoUrlErrMsg: "",
      passwordErrMsg: "",
      checkErrMsg: "",
    });
  };

  // This should handle submission of form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    resetErrMsg();
    setSuccessMsg("");

    if (!isChecked) {
      return setErrMsg((prevData) => ({
        ...prevData,
        checkErrMsg: "You must accept all our Terms & Conditions",
      }));
    }
    setPageLoading(true);
    register(formData.email, formData.password)
      .then((result) => {
        const user = result.user;

        // update user with additional information
        updateUser(user, {
          displayName: formData.name,
          photoURL: formData.photoUrl,
        })
          .then((result) => {
            firebaseRegiSuccess();
          })
          .catch((err) => {
            firebaseRegisterError(err);
          });
      })
      .catch((err) => {
        firebaseRegisterError(err);
      });

    setSubmitSuccess(true);
    setIsChecked(false);
    setFormData({
      name: "",
      email: "",
      photoUrl: "",
      password: "",
    });
  };

  // This should check whether the T & C  are checked or not
  useEffect(() => {
    if (!submitSuccess) {
      if (isChecked)
        return setErrMsg((prevData) => ({ ...prevData, checkErrMsg: "" }));
      else
        return setErrMsg((prevData) => ({
          ...prevData,
          checkErrMsg: "You must accept all our Terms & Conditions.",
        }));
    }
  }, [isChecked]);

  // This should check for Name validation
  useEffect(() => {
    if (!submitSuccess) {
      if (formData.name.length < 4) {
        return setErrMsg((prevData) => ({
          ...prevData,
          nameErrMsg: "Your name should be at least 4 characters.",
        }));
      } else {
        return setErrMsg((prevData) => ({
          ...prevData,
          nameErrMsg: "",
        }));
      }
    }
  }, [formData.name]);

  // This should check for Photo Url validation
  useEffect(() => {
    if (!submitSuccess) {
      if (!/^http/.test(formData.photoUrl)) {
        return setErrMsg((prevData) => ({
          ...prevData,
          photoUrlErrMsg: "Photo URL must start with 'http'",
        }));
      } else {
        return setErrMsg((prevData) => ({
          ...prevData,
          photoUrlErrMsg: "",
        }));
      }
    }
  }, [formData.photoUrl]);

  // This should check for password validation
  useEffect(() => {
    if (!submitSuccess) {
      if (formData.password.length < 6) {
        return setErrMsg((prevData) => ({
          ...prevData,
          passwordErrMsg: "Password should be at least 6 characters.",
        }));
      } else if (!/[A-Z]/.test(formData.password)) {
        return setErrMsg((prevData) => ({
          ...prevData,
          passwordErrMsg: "Password must include at least one upper case!",
        }));
      } else if (!/[a-z]/.test(formData.password)) {
        return setErrMsg((prevData) => ({
          ...prevData,
          passwordErrMsg: "Password must include at least one lower case!",
        }));
      } else if (!/[0-9]/.test(formData.password)) {
        return setErrMsg((prevData) => ({
          ...prevData,
          passwordErrMsg: "Password must include at least one number!",
        }));
      } else {
        return setErrMsg((prevData) => ({
          ...prevData,
          passwordErrMsg: "",
        }));
      }
    }
  }, [formData.password]);

  // This is for first render
  useEffect(() => {
    resetErrMsg();
  }, []);

  // handle the Register with Google button
  const handleGoogleRegister = () => {
    googleRegister()
      .then((result) => {
        firebaseRegiSuccess();
      })
      .catch((err) => {
        firebaseRegisterError(err);
      });
  };

  // Handle the Register with Github button
  const handleGithubRegister = () => {
    githubRegister()
      .then((result) => {
        firebaseRegiSuccess();
      })
      .catch((err) => {
        firebaseRegisterError(err);
      });
  };

  // handle Firebase error while registering
  const firebaseRegisterError = (err) => {
    console.log(err.message);
    console.log(err.code);
    if (err.code === "auth/email-already-in-use") {
      setToastMsg(`"${formData.email}" is already taken !`);
    } else if (err.code === "auth/invalid-email") {
      setToastMsg(`"${formData.email}" is invalid email !`);
    } else setToastMsg(err.message);

    setSuccessMsg("");
    setPageLoading(false);
  };

  // Handle All Successful firebase Registration
  const firebaseRegiSuccess = () => {
    setToastMsg("Joining Successful  !");

    setRegiSuccess(true);
    setSuccessMsg("Joining Successful  !");
    setPageLoading(true);
    setTimeout(() => {
      setRegiSuccess(false);
      setPageLoading(false);
      setToastMsg("Login Successful  !");
      navigate("/");
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title> Join | VolunEase</title>
      </Helmet>
      <div className="  container bg-base-100 mx-auto">
        <div className="hero bg-base-100 rounded-xl flex flex-col md:flex-row-reverse">
          <div className="hero-content  flex-1 w-full flex-col">
            <LogoWithTitle title={successMsg || "Join Here"} />

            <div className="card w-full max-w-lg shadow-2xl bg-base-100">
              {successMsg ? (
                <div className="my-10 mx-8 min-h-24">
                  <h1 className="text-2xl font-bold text-center mb-5 text-green-500">
                    Please Wait !
                  </h1>

                  <ActionButton buttonText="We are logging yoy in . . ." />
                </div>
              ) : (
                <>
                  <div className="card-body">
                    <div className=" flex gap-7 justify-center">
                      {/* Login with google */}

                      <div
                        onClick={handleGoogleRegister}
                        className="inline-block "
                      >
                        <GoogleButton text="Login with Github" />
                      </div>
                      {/* Login with GitHub */}

                      <div
                        onClick={handleGithubRegister}
                        className="inline-block "
                      >
                        <GithubButton text="Login with Github" />
                      </div>
                    </div>
                  </div>
                  <div className="divider  mb-0 px-4">OR</div>
                  <form className="card-body" onSubmit={handleFormSubmit}>
                    {/* Name part */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">Your Name</span>
                      </label>
                      <label className="input input-bordered flex items-center gap-2  border-prime">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="w-4 h-4 opacity-70"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input
                          type="text"
                          name="name"
                          placeholder="name"
                          value={formData.name || ""}
                          className="grow placeholder-gray-400 text-sm"
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    {errMsg.nameErrMsg && (
                      <p className="text-red-500 dark:text-yellow-400 dark:font-light text-center mt-3">
                        {errMsg.nameErrMsg}
                      </p>
                    )}

                    {/* Photo url part */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">
                          Your Photo URL
                        </span>
                      </label>
                      <label className="input input-bordered flex items-center gap-2 border-prime">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4 opacity-70"
                        >
                          <path d="M19.725 7.319a4.51 4.51 0 0 1 .775 6.341l-6.341 6.342a4.511 4.511 0 0 1-6.34-6.342l6.342-6.34a4.51 4.51 0 0 1 6.341-.775z"></path>
                          <path d="M15.192 4.808a6.51 6.51 0 0 1 8.678 8.678l-9.192 9.192a6.51 6.51 0 0 1-9.193-9.193l9.193-9.192z"></path>
                        </svg>
                        <input
                          type="text"
                          name="photoUrl"
                          placeholder="photo url"
                          value={formData.photoUrl || ""}
                          className="grow placeholder-gray-400 text-sm"
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    {errMsg.photoUrlErrMsg && (
                      <p className="text-red-500 dark:text-yellow-400 dark:font-light text-center mt-3">
                        {errMsg.photoUrlErrMsg}
                      </p>
                    )}

                    {/* email part */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">
                          Email <span className="text-red-500">*</span>
                        </span>
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

                    {/* password part */}
                    <div className="form-control relative">
                      <label className="label">
                        <span className="label-text text-lg">
                          Password <span className="text-red-500">*</span>
                        </span>
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
                      {errMsg.passwordErrMsg && (
                        <p className="text-red-500 dark:text-yellow-400 dark:font-light text-center mt-3">
                          {errMsg.passwordErrMsg}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                      />
                      <a href="#" className="label-text-alt link link-hover">
                        Accept All Terms & Conditions
                      </a>
                    </div>
                    {errMsg.checkErrMsg && (
                      <p className="text-red-500 dark:text-yellow-400 dark:font-light text-center mt-3">
                        {errMsg.checkErrMsg}
                      </p>
                    )}

                    <div className="form-control mt-6">
                      <button
                        disabled={
                          errMsg.nameErrMsg ||
                          errMsg.photoUrlErrMsg ||
                          errMsg.passwordErrMsg
                        }
                        className="btn btn-outline border-prime  text-prime  py-3 rounded-2xl hover:bg-prime hover:text-gray-100 hover:border-prime "
                      >
                        Register
                      </button>
                    </div>
                  </form>

                  <label className="label  flex justify-center mb-5">
                    <span className="text-sm mr-2">
                      Already have an account?
                    </span>
                    <Link
                      className="label-text-alt link link-hover text-blue-700 dark:text-blue-600 font-semibold"
                      to="/login"
                    >
                      Login Now
                    </Link>
                  </label>
                </>
              )}
            </div>
          </div>
          <div
            id="login_img"
            className="bg-cover mx-5 h-[1080px] bg-no-repeat flex flex-col gap-7 justify-center items-center flex-1 py-5"
          >
            <SideSectionWithSlidder writings="Need Volunteer ? Joun now! " />
          </div>
        </div>
      </div>
      {/* <GoToTopBtn /> */}
    </>
  );
};

export default Join;
