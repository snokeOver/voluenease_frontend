import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import GoToTopBtn from "../components/shared/GoToTopBtn";
import ActionButton from "../components/shared/ActionButton";
import { FaLock } from "react-icons/fa";
import useSAxios from "../hooks/useSAxios";
import useData from "../hooks/useData";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AddPost = () => {
  const sAxios = useSAxios();
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const { setPageLoading, currTheme } = useData();
  const [formData, setFormData] = useState({
    uid: user.uid || "",
    email: user.email || "",
    name: user.displayName || "",
    imageUrl: "",
    title: "",
    category: "",
    location: "",
    description: "",
    volunNumber: "",
    deadline: new Date(),
  });

  // Format date
  const formatedDate = (deadline) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return deadline.toLocaleDateString("en-GB", options);
  };

  // This should handle all the changes of different fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Set data from available user
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      }));
    }
  }, [user]);
  // This should handle submission of form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const postData = {
      ...formData,
      deadline: formatedDate(startDate),
    };

    Swal.fire({
      background: currTheme === "dark" ? "#1f2937 " : "",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Save it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setPageLoading(true);
          const { data } = await sAxios.post(`/api/add-post`, postData);
          if (data) {
            setPageLoading(false);
            Swal.fire({
              background: currTheme === "dark" ? "#1f2937 " : "",
              title: "Saved!",
              text: "Your tourist spot has been saved.",
              icon: "success",
            });
          } else {
            console.log(data);
            setPageLoading(false);
          }
        } catch (err) {
          console.log(err.response);
          setPageLoading(false);
        }
      }
    });

    setFormData((prevData) => ({
      ...prevData,
      imageUrl: "",
      title: "",
      category: "",
      location: "",
      description: "",
      volunNumber: "",
    }));
  };

  return (
    <>
      <Helmet>
        <title>Add Post | VolunEase</title>
      </Helmet>
      <div className=" md:container bg-base-100 mx-2 md:mx-auto">
        <div className="bg-base-200 flex flex-col gap-5 mx-2 md:mx-10 py-10 px-5">
          <div>
            <h2 className="text-2xl md:text-3xl text-center font-semibold">
              Add New Volunteer Post
            </h2>
          </div>
          <div className=" lg:w-[80%] xl:w-[70%] lg:mx-auto">
            <form className="" onSubmit={handleFormSubmit}>
              {/* first row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full">
                {/* Thumbnail part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Thumbnail URL <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 border-prime">
                    <input
                      required
                      type="text"
                      name="imageUrl"
                      placeholder="Image URL"
                      value={formData.imageUrl || ""}
                      className="grow placeholder-gray-400 text-sm"
                      onChange={handleChange}
                    />
                  </label>
                </div>

                {/* Category part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Category <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    required
                    name="category"
                    value={formData.category || ""}
                    onChange={handleChange}
                    className="select select-bordered w-full border-prime"
                  >
                    <option disabled value="">
                      Select a Category
                    </option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Social-Service">Social Service</option>
                    <option value="Animal-Welfare">Animal Welfare</option>
                  </select>
                </div>
              </div>

              {/* second row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full md:mt-3">
                {/* Post TItle part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Post Title <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 border-prime">
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Post Title"
                      value={formData.title || ""}
                      className="grow placeholder-gray-400 text-sm"
                      onChange={handleChange}
                    />
                  </label>
                </div>

                {/* Location part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Location <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 border-prime">
                    <input
                      required
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={formData.location || ""}
                      className="grow placeholder-gray-400 text-sm"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>

              {/* Third row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full md:mt-3">
                {/* No of Volunteers part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      No of Volunteers <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 border-prime">
                    <input
                      required
                      type="number"
                      name="volunNumber"
                      placeholder="No of Volunteers"
                      value={formData.volunNumber || ""}
                      className="grow placeholder-gray-400 text-sm"
                      onChange={handleChange}
                    />
                  </label>
                </div>
                {/* Deadline part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Deadline <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 border-prime">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </label>
                </div>
              </div>

              {/* Fourth row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full md:mt-3">
                {/* Name part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Organizer Name</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 border-prime relative">
                    <input
                      readOnly
                      type="text"
                      placeholder={formData.name}
                      className="grow placeholder-gray-400 text-sm"
                    />
                    <FaLock className="text-lg absolute right-4 bottom-4 " />
                  </label>
                </div>

                {/* Email part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Organizer Email</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 border-prime relative">
                    <input
                      readOnly
                      type="email"
                      placeholder={formData.email || "Private_Email"}
                      className="grow placeholder-gray-400 text-sm"
                    />
                    <FaLock className="text-lg absolute right-4 bottom-4 " />
                  </label>
                </div>
              </div>

              {/* Fifth row */}
              <div className="grid grid-cols-1 gap-2 md:gap-5  w-full md:mt-3">
                {/* Short Description part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Short Description
                    </span>
                  </label>
                  <textarea
                    name="description"
                    rows={6}
                    value={formData.description || ""}
                    onChange={handleChange}
                    placeholder="Write relevant description here . . . "
                    className="text-area-style input input-bordered h-auto placeholder-gray-400 text-sm border-prime"
                    required
                  />
                </div>
              </div>
              <div className="form-control mt-6 md:w-1/2 mx-auto">
                <ActionButton buttonText="Add Spot" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <GoToTopBtn />
    </>
  );
};

export default AddPost;
