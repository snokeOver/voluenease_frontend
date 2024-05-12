import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import { FaLock } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";
import useSAxios from "../hooks/useSAxios";
import PageSkeleton from "../components/shared/PageSkeleton";
import SinglePost from "../managePosts/SinglePost";
import PrimaryButton from "../components/shared/PrimaryButton";
import GoToTopBtn from "../components/shared/GoToTopBtn";
import ActionButton from "../components/shared/ActionButton";

const ManagePosts = () => {
  const { user } = useAuth();
  const sAxios = useSAxios();
  const { setPageLoading, pageLoading, currTheme } = useData();
  const [startDate, setStartDate] = useState(new Date());
  const [loadedPosts, setLoadedPosts] = useState([]);

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    imageUrl: "",
    spot: "",
    country: "",
    location: "",
    description: "",
    cost: "",
    seasonality: "",
    travel_time: "",
    visitors_per_year: "",
  });

  // Format date
  const formatedDate = (deadline) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = deadline.toLocaleDateString("en-GB", options);
    return formattedDate.replace(/ /g, "-");
  };

  // Get the Posts that this organizer added
  const getPostsOfOrganizer = async () => {
    try {
      setPageLoading(true);
      const { data } = await sAxios.get(`/api/organizer-posts/${user.uid}`);
      if (data) {
        setLoadedPosts(data);
        setPageLoading(false);
      } else {
        console.log(data);
        setPageLoading(false);
      }
    } catch (err) {
      console.log(err.response);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getPostsOfOrganizer();
    }
  }, [user]);

  // Handle the update post
  const handleDeletePost = (id) => {
    Swal.fire({
      background: currTheme === "dark" ? "#1f2937 " : "",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setPageLoading(true);
          const response = await sAxios.delete(`/api/post/${id}`);
          if (response.data) {
            setPageLoading(false);
            getPostsOfOrganizer();
            Swal.fire({
              background: currTheme === "dark" ? "#1f2937 " : "",
              title: "Deleted!",
              text: "Your tourist spot has been Deleted.",
              icon: "success",
            });
          } else {
            setPageLoading(false);
            console.log(response.data);
          }
        } catch (err) {
          setPageLoading(false);
          console.log(err.response);
        }
      }
    });
  };

  // Handle the update spot
  const handleUpdatePost = (singleSpot) => {
    setBtnDisabled(true);

    setFormData((prevData) => ({
      ...prevData,
      id: singleSpot._id,
      imageUrl: singleSpot.imageUrl,
      title: singleSpot.title,
      category: singleSpot.category,
      location: singleSpot.location,
      description: singleSpot.description,
      volunNumber: singleSpot.volunNumber,
      deadline: singleSpot.deadline,
      uid: user.uid || "",
      email: user.email || "Private_Email",
      name: user.displayName || "",
    }));
    setOpenModal(true);
  };

  // This should handle all the changes of different fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setBtnDisabled(false);
  };

  // Handle the update button from Modal
  const handleUpdateFromModal = (e) => {
    e.preventDefault();
    const { id, ...postData } = formData;
    postData.deadline = formatedDate(startDate);
    postData.email = user.email || "Private_Email";
    postData.volunNumber = parseInt(formData.volunNumber);

    Swal.fire({
      background: currTheme === "dark" ? "#1f2937 " : "",
      target: document.getElementById("form-modal"),
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setPageLoading(true);
        try {
          const response = await sAxios.patch(
            `/api/post/${formData.id}`,
            postData
          );
          if (response.data) {
            getPostsOfOrganizer();
            setPageLoading(false);
            setOpenModal(false);
            Swal.fire({
              background: currTheme === "dark" ? "#1f2937 " : "",
              title: "Updated!",
              text: "Your post has been Updated.",
              icon: "success",
            });
          } else {
            console.log(response.data);
            setPageLoading(false);
            setOpenModal(false);
          }
        } catch (err) {
          console.log(err.response);
          setPageLoading(false);
          setOpenModal(false);
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Manage Posts | VolunEase</title>
      </Helmet>
      {pageLoading ? (
        <PageSkeleton />
      ) : (
        <div className=" md:container bg-base-100 mx-2 md:mx-auto">
          {/* testing */}
          <div className="hero py-10 rounded-lg bg-base-200">
            <div className="hero-content text-center flex-col">
              <div className="text-center">
                <h1 className="text-4xl font-bold">
                  {loadedPosts.length > 0
                    ? "All The Posts You Created"
                    : "You didn't add any Post yet!"}
                </h1>
              </div>
              <div className="max-w-[20.9rem] xs:max-w-[23rem] md:max-w-2xl lg:max-w-3xl">
                {loadedPosts.length > 0 && (
                  <div className="card w-full  shadow-2xl bg-base-100">
                    {/* Table for cart */}
                    <div className="overflow-x-auto py-7 ">
                      <table className="table">
                        {/* head */}
                        <thead>
                          <tr className="text-center text-lg">
                            <th></th>
                            <th>Title</th>
                            <th>Volunteers</th>
                            <th>Deadline</th>
                            <th colSpan="2">Actions</th>
                          </tr>
                          <tr>
                            <th colSpan="6">
                              <div className="divider -my-3"></div>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {loadedPosts.map((sPost, index) => (
                            <SinglePost
                              index={index}
                              key={sPost._id}
                              sPost={sPost}
                              handleDeletePost={handleDeletePost}
                              handleUpdatePost={handleUpdatePost}
                            />
                          ))}
                          <tr>
                            <th colSpan="6">
                              <div className="divider -my-3"></div>
                            </th>
                          </tr>

                          <tr>
                            <th className="text-center text-lg" colSpan="6">
                              <span className="mr-3">To add more post</span>
                              <span className="inline-block">
                                <Link to="/add-volunteer-post">
                                  <PrimaryButton textField="Click Here" />
                                </Link>
                              </span>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* modal to update spot */}
          <dialog
            id="spot_update_modal"
            className={`modal ${openModal ? "modal-open" : ""} `}
          >
            <div id="form-modal" className="modal-box w-11/12 max-w-5xl">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  onClick={() => setOpenModal(false)}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>
              </form>
              <div>
                <h2 className="text-2xl text-center font-semibold mb-5">
                  Update This Spot
                </h2>
              </div>
              <div className=" lg:w-[80%] xl:w-[70%] lg:mx-auto">
                <form className="" onSubmit={handleUpdateFromModal}>
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
                          No of Volunteers{" "}
                          <span className="text-red-500">*</span>
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
                        <span className="label-text text-lg">
                          Organizer Name
                        </span>
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
                        <span className="label-text text-lg">
                          Organizer Email
                        </span>
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
                          Short Description{" "}
                          <span className="text-red-500">*</span>
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
                    <ActionButton buttonText="Update Post" />
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
      <GoToTopBtn />
    </>
  );
};

export default ManagePosts;
