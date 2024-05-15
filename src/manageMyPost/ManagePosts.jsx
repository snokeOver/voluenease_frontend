import DatePicker from "react-datepicker";
import { FaLock } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

import { Link } from "react-router-dom";

import SinglePost from "./SinglePost";
import PrimaryButton from "../components/shared/PrimaryButton";
import GoToTopBtn from "../components/shared/GoToTopBtn";
import ActionButton from "../components/shared/ActionButton";

const ManagePosts = ({
  loadedPosts,
  handleDeletePost,
  handleUpdatePost,
  openModal,
  setOpenModal,
  handleUpdateFromModal,
  formData,
  handleChange,
  startDate,
  setStartDate,
}) => {
  return (
    <>
      <div className=" bg-base-100">
        {/* testing */}
        <div className=" rounded-lg ">
          <div className="text-center flex-col">
            <div className="text-center py-2">
              {loadedPosts.length < 1 && (
                <>
                  <h1 className="text-xl lg:text-4xl font-bold py-10">
                    You didn't create any post yet !
                  </h1>
                  <div className="text-center text-lg mb-5" colSpan="6">
                    <span className="mr-3">To create post</span>
                    <span className="inline-block">
                      <Link to="/add-volunteer-post">
                        <PrimaryButton textField="Click Here" />
                      </Link>
                    </span>
                  </div>
                </>
              )}
            </div>
            {/* heading section */}
            <div className=" flex  items-center w-[90%] mx-auto gap-x-3 mb-4">
              <h2 className="text-lg  font-medium ">My Posts for Volunteers</h2>

              <span className="px-3 py-1 text-xs text-primary bg-blue-100 rounded-full ">
                {loadedPosts.length}
                <span className="ml-1"> Post (s)</span>
              </span>
            </div>
            {/* Table section */}
            <div className="max-w-[21rem] xs:max-w-[23rem] md:max-w-5xl  mx-auto">
              {loadedPosts.length > 0 && (
                <div className="card w-full  shadow-2xl bg-base-100">
                  {/* Table for cart */}
                  <div className="overflow-x-auto py-7  bg-base-300">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr className="text-left text-lg">
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
          <div
            id="form-modal"
            className="modal-box w-11/12 max-w-5xl bg-base-200"
          >
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
                    <label className="input input-bordered flex items-center gap-2 border-primary">
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
                      className="select select-bordered w-full border-primary"
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
                    <label className="input input-bordered flex items-center gap-2 border-primary">
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
                    <label className="input input-bordered flex items-center gap-2 border-primary">
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
                    <label className="input input-bordered flex items-center gap-2 border-primary">
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

                    <DatePicker
                      className="input input-bordered flex items-center gap-2 border-primary w-full"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                </div>

                {/* Fourth row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full md:mt-3">
                  {/* Name part */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">Organizer Name</span>
                    </label>
                    <label className="input  flex items-center gap-2  relative">
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
                    <label className="input  flex items-center gap-2  relative">
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
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <textarea
                      name="description"
                      rows={6}
                      value={formData.description || ""}
                      onChange={handleChange}
                      placeholder="Write relevant description here . . . "
                      className="text-area-style input input-bordered h-auto placeholder-gray-400 text-sm border-primary"
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

      <GoToTopBtn />
    </>
  );
};

export default ManagePosts;
