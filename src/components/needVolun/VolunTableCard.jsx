import { BsFillEyeFill } from "react-icons/bs";
const VolunTableCard = ({ post, index, handleShowDetailsBtn }) => {
  const { title, volunNumber, deadline, _id, status, category, location } =
    post;
  return (
    <>
      <tr
        className={`cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-200 my_tooltip_${index}`}
      >
        <th>{index + 1}</th>
        <td>{title}</td>
        <td>
          {volunNumber > 0 ? (
            volunNumber
          ) : (
            <p className="text-yellow-500">Filled</p>
          )}
        </td>
        <td>
          {new Date(deadline).setHours(0, 0, 0, 0) >=
          new Date().setHours(0, 0, 0, 0) ? (
            `${deadline}`
          ) : (
            <p className="text-yellow-500">Expired</p>
          )}
        </td>
        <td>{location}</td>
        <td>{category}</td>
        <td>{status}</td>
        <td className="">
          <button
            onClick={() => handleShowDetailsBtn(_id)}
            className="btn  btn-primary btn-outline flex-1   py-3 mb-3  rounded-md w-full"
          >
            <div className="flex items-center gap-2">
              <span>
                <BsFillEyeFill className="text-xl" />
              </span>
              <span> Details</span>
            </div>
          </button>
        </td>
      </tr>
    </>
  );
};

export default VolunTableCard;
