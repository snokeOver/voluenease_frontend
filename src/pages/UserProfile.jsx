import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import ActionButton from "../components/shared/ActionButton";
import GoToTopBtn from "../components/shared/GoToTopBtn";

const UserProfile = () => {
  const { user, updateUser, setProfileUpdate } = useAuth();
  const { setToastMsg, setPageLoading } = useData();

  const [firebaseError, setFirebaseError] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const fallbackPPUrl = "https://i.ibb.co/vxg6nY4/user.png";

  // convert timezone into local
  const convertTimezoneToLocal = (timeStamp) => {
    const date = new Date(timeStamp);
    return date.toLocaleString();
  };

  const createTime = convertTimezoneToLocal(user.metadata.creationTime);
  const logTime = convertTimezoneToLocal(user.metadata.lastSignInTime);

  const [formData, setFormData] = useState({
    name: user.displayName || "",
    photoUrl: user.photoURL || "",
  });

  // This should handle all the changes of different fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setBtnDisabled(false);
  };

  // fallback for Profile image to show default image
  const handleImageError = (event) => {
    event.target.src = "https://i.ibb.co/vxg6nY4/user.png";
  };

  // handle Update profile section
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setPageLoading(true);
    updateUser(user, {
      displayName: formData.name,
      photoURL: formData.photoUrl,
    })
      .then((result) => {
        setFirebaseError("");
        setUpdateMsg("Profile updated successfully!");
        setProfileUpdate(true);
        setPageLoading(false);
      })
      .catch((err) => {
        setFirebaseError(err.code);
        setUpdateMsg("");
        setPageLoading(false);
      });
  };

  // handle error and success message & toast
  useEffect(() => {
    if (firebaseError) {
      setToastMsg(firebaseError);

      setFirebaseError("");
    }
    if (updateMsg) {
      setToastMsg(updateMsg);

      setUpdateMsg("");
    }
    setBtnDisabled(true);
  }, [firebaseError, updateMsg]);
  return (
    <>
      <Helmet>
        <title>User Profile | VolunEase</title>
      </Helmet>
      <div className=" md:container bg-base-100 mx-2 md:mx-auto overflow-hidden">
        <div className=" flex flex-col gap-6">
          <div className="card  w-full lg:w-1/2 mx-auto bg-base-100 shadow-xl rounded-md">
            <div className="card-body flex items-center ">
              <h2 className="card-title text-2xl md:text-3xl">
                Update Your Profile
              </h2>
              <div className="w-48 mt-5">
                <img
                  className="rounded-md"
                  alt="User Photo"
                  src={user?.photoURL || fallbackPPUrl}
                  onError={handleImageError}
                />
              </div>
            </div>
          </div>
          <form onSubmit={handleUpdateProfile}>
            <div className="card bg-base-200 card-compact my-8  lg:w-1/2 mx-auto shadow-xl rounded-md ">
              {/* Email section */}
              <div className=" card-body grid grid-cols-3 px-5 items-center gap-4 ">
                <h3>Your Email:</h3>
                <div className="relative col-span-2">
                  <input
                    name="email"
                    readOnly
                    type="text"
                    placeholder={user.email || "< Private_Email >"}
                    className="input input-md w-full max-w-xs  "
                  />
                  <FaLock className="text-lg absolute right-5 bottom-4 sm:right-20 md:right-48 lg:right-5 xl:right-24 2xl:right-48" />
                </div>
              </div>
              {/* Email Verification Statues */}
              <div className=" card-body grid grid-cols-3 px-5 items-center gap-4 ">
                <h3>Eamil Status:</h3>
                <div className="relative col-span-2">
                  <input
                    name="email"
                    readOnly
                    type="text"
                    placeholder={user.emailVerified ? "Verified" : "Not Vefied"}
                    className="input input-md w-full max-w-xs  "
                  />
                  <FaLock className="text-lg absolute right-5 bottom-4 sm:right-20 md:right-48 lg:right-5 xl:right-24 2xl:right-48" />
                </div>
              </div>

              {/* Registered Date section */}
              <div className=" card-body grid grid-cols-3 px-5 items-center gap-4 ">
                <h3>Registerd At:</h3>
                <div className="relative col-span-2">
                  <input
                    name="email"
                    readOnly
                    type="text"
                    placeholder={createTime}
                    className="input input-md w-full max-w-xs  "
                  />
                  <FaLock className="text-lg absolute right-5 bottom-4 sm:right-20 md:right-48 lg:right-5 xl:right-24 2xl:right-48" />
                </div>
              </div>

              {/* Last Login Date section */}
              <div className=" card-body grid grid-cols-3 px-5 items-center gap-4 ">
                <h3>Last Login:</h3>
                <div className="relative col-span-2">
                  <input
                    name="email"
                    readOnly
                    type="text"
                    placeholder={logTime}
                    className="input input-md w-full max-w-xs  "
                  />
                  <FaLock className="text-lg absolute right-5 bottom-4 sm:right-20 md:right-48 lg:right-5 xl:right-24 2xl:right-48" />
                </div>
              </div>
              <div className="card-body grid grid-cols-3 px-5 items-center gap-4 ">
                <h3>Your Name:</h3>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder={user.displayName}
                  className="input col-span-2 input-bordered  input-md w-full max-w-xs border-prime"
                />
              </div>

              <div className="card-body grid grid-cols-3  px-5 items-center gap-4">
                <h3>Photo Url:</h3>

                <input
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  type="text"
                  placeholder={user.photoURL}
                  className="input col-span-2 input-bordered  input-md w-full max-w-xs border-prime"
                />
              </div>
              <div className="card-body w-full md:w-[80%] mx-auto  px-5 items-center gap-4 mb-6">
                <ActionButton disabledStat={btnDisabled} buttonText="Update" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <GoToTopBtn />
    </>
  );
};

export default UserProfile;
