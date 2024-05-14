import { BsFillEyeFill } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { FaPeopleLine } from "react-icons/fa6";

const VolunPostCard = ({ post, handleShowDetailsBtn }) => {
  const { imageUrl, title, deadline, _id, volunNumber } = post;

  return (
    <div className="card card-compact card-side bg-base-100 rounded-xl border shadow-xl">
      <figure className="flex-1">
        <img
          className=" h-full  hover:!scale-95 duration-500"
          src={imageUrl}
          alt={imageUrl}
        />
      </figure>
      <div className="card-body flex-1">
        <h2 className="card-title text-primary">{title}</h2>
        <div className="grid grid-cols-2 flex-grow  py-3 text-message-color">
          <div className="flex flex-col items-center gap-2 text-center">
            <FaPeopleLine className="text-2xl" />
            <h3>
              {volunNumber > 0 ? (
                volunNumber
              ) : (
                <p className="text-yellow-500">Filled</p>
              )}
            </h3>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <CiCalendarDate className="text-xl" />
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

export default VolunPostCard;
