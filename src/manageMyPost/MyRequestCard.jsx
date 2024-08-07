import { Tooltip } from "react-tooltip";
const MyRequestCard = ({ sPost, index, handleDeleteRequest }) => {
  const { title, volunNumber, deadline, postId, status, imageUrl } = sPost;
  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-200 ">
        <th>{index + 1}</th>
        <td className={`my_tooltip_${index}`}>{title}</td>
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
        <td>{status}</td>
        <td className="cancel_btn_tooltip">
          <button
            onClick={() => handleDeleteRequest(postId)}
            className="text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </td>
      </tr>
      <Tooltip
        anchorSelect={`.my_tooltip_${index}`}
        place="bottom"
        className="z-50"
      >
        <img
          className="w-32 h-24 md:w-52 md:h-32 rounded-md"
          src={imageUrl}
          alt=""
        />
      </Tooltip>
      <Tooltip
        anchorSelect=".cancel_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="warning"
      >
        <p>Cancel</p>
      </Tooltip>
    </>
  );
};

export default MyRequestCard;
