import { BsFillEyeFill } from "react-icons/bs";
const VolunTableCard = ({ post, index }) => {
  const { title, volunNumber, deadline, postId, status, category, location } =
    post;
  return (
    <>
      <tr
        className={`cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-200 my_tooltip_${index}`}
      >
        <th>{index + 1}</th>
        <td>{title}</td>
        <td>{volunNumber}</td>
        <td>{deadline}</td>
        <td>{location}</td>
        <td>{category}</td>
        <td>{status}</td>
        <td className="">
          <button className="btn  btn-primary btn-outline flex-1   py-3 mb-3  rounded-md w-full">
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
