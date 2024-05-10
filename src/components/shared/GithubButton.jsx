import { FaGithub } from "react-icons/fa";
const GithubButton = () => {
  return (
    <button className="btn bg-transparent  border-primary hover:bg-none dark:hover:bg-none rounded-full h-16 p-2 ">
      <FaGithub className="text-xl" />
    </button>
  );
};

export default GithubButton;
