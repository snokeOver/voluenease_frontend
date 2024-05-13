import { FaLocationDot } from "react-icons/fa6";
import { BsFillEyeFill } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";

const PostCard = ({ post, handleShowDetailsBtn }) => {
  const { imageUrl, location, title, category, deadline, _id } = post;

  return (
    <div className="card card-compact w-auto bg-base-100 rounded-xl    border">
      <figure className="relative mb-3 ">
        <img
          className="w-full rounded-t-xl h-[17rem]  hover:!scale-110 duration-500"
          src={imageUrl}
          alt={imageUrl}
        />
        <h5 className="absolute  top-5 right-5 px-3 text-prime font-semibold  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-300 hover:text-gray-800">
          {category}
        </h5>
      </figure>

      <div className="card-body">
        <div className="text-left flex-grow">
          <h2 className="text-2xl text-primary  font-bold ">{title}</h2>
        </div>
        <div className="divider p-0 m-0"></div>

        <div className="grid grid-cols-2 flex-grow  py-3 text-message-color">
          <div className="flex flex-col items-center gap-2 text-center">
            <FaLocationDot className="text-lg" />
            <h3>{location}</h3>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <CiCalendarDate className="text-lg" />
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
        <div className="pt-3 w-full">
          <button
            onClick={() => handleShowDetailsBtn(_id)}
            className="btn btn-primary btn-outline flex-1 py-3 mb-3  rounded-md w-full"
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
