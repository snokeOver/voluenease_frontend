import { Link } from "react-router-dom";

const LogoWithTitle = ({ title }) => {
  return (
    <>
      <Link
        to="/"
        className="bg-transparent border border-primary  rounded-full p-3"
      >
        <img src="https://i.ibb.co/LQy37MK/logoV.png" alt="" className="w-16" />
      </Link>
      <div className="text-center lg:text-left ">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
    </>
  );
};

export default LogoWithTitle;
