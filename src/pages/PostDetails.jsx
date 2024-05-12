import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Swal from "sweetalert2";

import { Helmet } from "react-helmet-async";
import useAxios from "../hooks/useAxios";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";
import { goToTop } from "../helper/goToTop";
import PageSkeleton from "../components/shared/PageSkeleton";
import GoToTopBtn from "../components/shared/GoToTopBtn";
import ActionButton from "../components/shared/ActionButton";
import useSAxios from "../hooks/useSAxios";
import PrimaryButton from "../components/shared/PrimaryButton";

const PostDetails = () => {
  const nsAxios = useAxios();
  const sAxios = useSAxios();
  const { setToastMsg, pageLoading, setPageLoading, currTheme } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [postCard, setPostCard] = useState({});
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [formData, setFormData] = useState({
    postId: "",
    organizerId: "",
    volunteerId: "",
    email: "",
    name: "",
    imageUrl: "",
    title: "",
    category: "",
    location: "",
    description: "",
    volunNumber: "",
    deadline: "",
    VolunName: "",
    volunEmail: "",
    suggestion: "",
    status: "",
  });

  // checks if this user already requested for this post
  const checkRequest = async (postId) => {
    const postData = {
      postId: postId,
      volunteerId: user.uid,
    };
    try {
      setPageLoading(true);
      const { data } = await sAxios.post(`/api/request-check`, postData);
      setPageLoading(false);
      setIsApplied(data.success);
    } catch (err) {
      console.log(err.response);
      setPageLoading(false);
      setIsApplied(false);
    }
  };

  // Get the Spots that this user added
  useEffect(() => {
    const getSingleData = async () => {
      try {
        const { data } = await nsAxios.get(`/api/post/${id}`);
        if (data) {
          setPostCard(data);

          checkRequest(data._id);
        } else {
          console.log(data);
          setPageLoading(false);
        }
      } catch (err) {
        console.log(err.response);
        setPageLoading(false);
      }
    };
    if (user) {
      setPageLoading(true);
      getSingleData();
    }
  }, [user]);

  // Handle the add to cart button
  const handleBeVolunteer = (singlePost) => {
    if (!user) {
      navigate("/login");
      return goToTop();
    } else if (
      new Date(singlePost.deadline).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)
    ) {
      return setToastMsg("Expired! Please find another !");
    } else if (singlePost.email === user.email) {
      return setToastMsg("You are not allowed !");
    } else if (singlePost.volunNumber < 1) {
      return setToastMsg("Requirement filled up, Find another !");
    } else if (isApplied) {
      return setToastMsg("You already applied for this post !");
    }

    setFormData((prevData) => ({
      ...prevData,
      postId: singlePost._id,
      organizerId: singlePost.uid,
      volunteerId: user.uid,
      email: singlePost.email,
      name: singlePost.name,
      imageUrl: singlePost.imageUrl,
      title: singlePost.title,
      category: singlePost.category,
      location: singlePost.location,
      description: singlePost.description,
      volunNumber: singlePost.volunNumber,
      deadline: singlePost.deadline,
      VolunName: user.displayName || "",
      volunEmail: user.email || "Private_Email",
      suggestion: "",
      status: "Requested",
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

  // Handle the Volunteer Request button from Modal to create Request and update the number of volunteers of related post
  const handleVolunRequest = (e) => {
    e.preventDefault();

    Swal.fire({
      background: currTheme === "dark" ? "#1f2937 " : "",
      target: document.getElementById("form-modal"),
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Request to Be Volunteer !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setPageLoading(true);
        try {
          const { data } = await sAxios.post(
            `/api/request-to-volunteer/`,
            formData
          );
          if (data) {
            checkRequest(formData.postId);
            setOpenModal(false);
            Swal.fire({
              background: currTheme === "dark" ? "#1f2937 " : "",
              title: "Created!",
              text: "Your Request has been Created.",
              icon: "success",
            });
          } else {
            console.log(data);
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
        <title>Post Details | VolunEase</title>
      </Helmet>
      <div className="md:container mx-2 bg-base-100 md:mx-auto">
        <div className="card card-compact w-full  px-4 py-4">
          {pageLoading ? (
            <div>
              <PageSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:p-8">
              <figure className="w-full mx-auto rounded-xl ">
                <img
                  className="h-full py-4 "
                  src={postCard.imageUrl}
                  alt={postCard.imageUrl}
                />
              </figure>
              <div className="card-body text-left w-full">
                <div className="flex justify-between items-center">
                  <h2 className="card-title text-2xl md:text-4xl font-bold text-heading-color playfair-font">
                    {postCard.title}
                  </h2>
                  <div>
                    <h5 className=" px-4 py-1 bg-primary text-gray-100 font-semibold rounded-xl inline-block">
                      {postCard.category}
                    </h5>
                  </div>
                </div>

                <div className=" font-mediumpy-5 mt-3 text-message-color">
                  <h4 className="text-lg text-left">
                    <span className="font-extrabold text-lg mr-2">
                      Deadlines:
                    </span>
                    <span className=" text-primary text-lg font-semibold inline-block">
                      {new Date(postCard.deadline).setHours(0, 0, 0, 0) >=
                      new Date().setHours(0, 0, 0, 0) ? (
                        `${postCard.deadline}`
                      ) : (
                        <p className="text-yellow-500">Expired</p>
                      )}
                    </span>
                  </h4>
                </div>
                <div className=" font-mediumpy-5 mt-3 text-message-color">
                  <h4 className="text-lg text-left">
                    <span className="font-extrabold text-lg mr-2">
                      Number of Volunteers:
                    </span>
                    {postCard.volunNumber}
                  </h4>
                </div>

                <div className="my-2">
                  <span className="font-extrabold text-lg mr-2">
                    Description:
                  </span>
                  <br />
                  <p className="text-justify">{postCard.description}</p>
                </div>

                <div className="divider mb-0"></div>
                <div className="flex flex-col gap-3 font-medium  pt-5 text-message-color">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-3">
                      <FaLocationDot className="text-lg" />
                      <h3 className="text-message-color">Location:</h3>
                    </div>
                    <span className="font-bold">{postCard.location}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-3">
                      <FaPhoneAlt className="text-lg" />
                      <h3 className="text-message-color">Organizer Name:</h3>
                    </div>
                    <span className="font-bold">{postCard.name}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-3">
                      <MdEmail className="text-lg" />
                      <h3 className="text-message-color">Organizer Email:</h3>
                    </div>
                    <span className="font-bold">{postCard.email}</span>
                  </div>
                </div>

                <div
                  className="flex gap-10 w-[90%] mx-auto mt-8"
                  onClick={() => handleBeVolunteer(postCard)}
                >
                  <ActionButton buttonText="Be A Volunteer" />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* modal to create request to be-volunteer on this post */}
        <dialog
          id="volun_request_modal"
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
              <h2 className="text-2xl text-primary text-center font-semibold mb-5">
                Be One of The Volunteers
              </h2>
            </div>
            <div className=" lg:w-[80%] xl:w-[70%] lg:mx-auto">
              <form className="" onSubmit={handleVolunRequest}>
                {/* first row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full">
                  {/* Image part */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">Thumbnail URL</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 border-prime relative">
                      <input
                        readOnly
                        placeholder={formData.imageUrl}
                        className="grow placeholder-gray-400 text-sm"
                      />
                      <FaLock className="text-lg absolute right-4 bottom-4 " />
                    </label>
                  </div>

                  {/* Category part */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">Category</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 border-prime relative">
                      <input
                        readOnly
                        placeholder={formData.category}
                        className="grow placeholder-gray-400 text-sm"
                      />
                      <FaLock className="text-lg absolute right-4 bottom-4 " />
                    </label>
                  </div>
                </div>

                {/* second row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full md:mt-3">
                  {/* Tourist spot part */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">Title</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 border-prime relative">
                      <input
                        readOnly
                        placeholder={formData.title}
                        className="grow placeholder-gray-400 text-sm"
                      />
                      <FaLock className="text-lg absolute right-4 bottom-4 " />
                    </label>
                  </div>

                  {/* Location part */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">Location</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 border-prime relative">
                      <input
                        readOnly
                        placeholder={formData.location}
                        className="grow placeholder-gray-400 text-sm"
                      />
                      <FaLock className="text-lg absolute right-4 bottom-4 " />
                    </label>
                  </div>
                </div>

                {/* Third row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full md:mt-3">
                  {/* No of Volunteers part */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">
                        No. Of Volunteers
                      </span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 border-prime relative">
                      <input
                        readOnly
                        placeholder={formData.volunNumber}
                        className="grow placeholder-gray-400 text-sm"
                      />
                      <FaLock className="text-lg absolute right-4 bottom-4 " />
                    </label>
                  </div>
                  {/* Deadline part */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">Deadline</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 border-prime relative">
                      <input
                        readOnly
                        placeholder={formData.deadline}
                        className="grow placeholder-gray-400 text-sm"
                      />
                      <FaLock className="text-lg absolute right-4 bottom-4 " />
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
                      <span className="label-text text-lg">Description</span>
                    </label>
                    <textarea
                      name="description"
                      rows={4}
                      value={formData.description || ""}
                      onChange={handleChange}
                      placeholder="Write relevant description here . . . "
                      className="text-area-style input input-bordered h-auto placeholder-gray-400 text-sm border-prime"
                      required
                    />
                  </div>
                </div>

                {/* Sixth row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full md:mt-3">
                  {/* Name part */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">Volunteer Name</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 border-prime relative">
                      <input
                        readOnly
                        placeholder={formData.VolunName}
                        className="grow placeholder-gray-400 text-sm"
                      />
                      <FaLock className="text-lg absolute right-4 bottom-4 " />
                    </label>
                  </div>

                  {/* Email part */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">
                        Volunteer Email
                      </span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 border-prime relative">
                      <input
                        readOnly
                        placeholder={formData.volunEmail}
                        className="grow placeholder-gray-400 text-sm"
                      />
                      <FaLock className="text-lg absolute right-4 bottom-4 " />
                    </label>
                  </div>
                </div>
                {/* Seventh row */}
                <div className="grid grid-cols-1 gap-2 md:gap-5  w-full md:mt-3">
                  {/* Suggestion part */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">Suggestion</span>
                    </label>
                    <textarea
                      name="suggestion"
                      rows={2}
                      value={formData.suggestion || ""}
                      onChange={handleChange}
                      placeholder="Write if you have any . . . "
                      className="text-area-style input input-bordered h-auto placeholder-gray-400 text-sm border-prime"
                    />
                  </div>
                </div>
                <div className="form-control mt-6 md:w-1/2 mx-auto">
                  <PrimaryButton textField="Request" />
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <GoToTopBtn />
    </>
  );
};

export default PostDetails;
