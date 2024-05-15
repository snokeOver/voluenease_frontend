import { FaLocationDot } from "react-icons/fa6";
import { BsFillEyeFill } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { FaPeopleLine } from "react-icons/fa6";

const PostCard = ({ post, handleShowDetailsBtn }) => {
  const { imageUrl, location, title, category, deadline, _id, volunNumber } =
    post;

  return (
    <div className="card card-compact card-side bg-base-100 rounded-xl border shadow-xl">
      <figure className="flex-1 relative">
        <img
          className=" h-full  hover:!scale-95 duration-500"
          src={imageUrl}
          alt={imageUrl}
        />
        <div>
          <h5 className="absolute  top-5 right-5 px-3 text-gray-800 font-semibold  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-300 hover:text-primary">
            {category}
          </h5>
        </div>
      </figure>
      <div className="card-body flex-1">
        <h2 className="card-title text-primary">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 flex-grow  py-3 text-message-color">
          <div className="flex md:flex-col items-center gap-2 text-center">
            <FaLocationDot className="text-2xl" />
            <h3>{location}</h3>
          </div>
          <div className="flex md:flex-col items-center gap-2 text-center">
            <FaPeopleLine className="text-3xl" />
            <h3>
              {volunNumber > 0 ? (
                volunNumber
              ) : (
                <p className="text-yellow-500">Filled</p>
              )}
            </h3>
          </div>
          <div className="flex md:flex-col items-center gap-2 text-center">
            <CiCalendarDate className="text-3xl" />
            <h3>
              {new Date(deadline).setHours(0, 0, 0, 0) >=
              new Date().setHours(0, 0, 0, 0) ? (
                `${deadline}`
              ) : (
                <p className="text-yellow-500">Expired</p>
              )}
            </h3>
          </div>
        </div>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleShowDetailsBtn(_id)}
            className="btn btn-primary btn-outline flex-1   py-3 mb-3  rounded-md w-full"
          >
            <BsFillEyeFill className="text-xl" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
