import { FaCheck } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
const WhyUsCard = ({ card }) => {
  const { title, message } = card;
  return (
    <div className="card w-72 bg-base-200 shadow-xl mr-10 md:mr-16 lg:mr-28">
      <figure className="mt-7">
        <div>
          <FaCheck className="text-primary border-2 border-primary rounded-full w-14 h-14 p-2" />
        </div>
      </figure>
      <div className="card-body  text-center flex-grow">
        <h2 className="text-lg font-semibold text-center mb-2">{title}</h2>
        <div className="text-justify text-sm flex-grow">
          <FaQuoteLeft />

          <span className="ml-4 mt-1">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default WhyUsCard;
