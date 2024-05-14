import ButtonSpinner from "./ButtonSpinner";
import useData from "../../hooks/useData";

const ActionButton = ({ buttonText, disabledStat }) => {
  const { pageLoading } = useData();

  return (
    <button
      disabled={disabledStat}
      className="btn btn-outline border-prime  text-prime  py-3 rounded-2xl hover:bg-prime hover:text-gray-100 hover:border-prime w-full"
    >
      {pageLoading && <ButtonSpinner />}
      {buttonText}
    </button>
  );
};

export default ActionButton;
