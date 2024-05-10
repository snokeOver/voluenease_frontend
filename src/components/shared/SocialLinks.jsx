import {
  TiSocialFacebook,
  TiSocialYoutube,
  TiSocialLinkedin,
} from "react-icons/ti";
import { BsTwitterX } from "react-icons/bs";

const SocialLinks = () => {
  return (
    <nav>
      <div className="grid grid-flow-col items-center gap-8 ">
        <div>
          <div className="cursor-pointer hover:!scale-150 duration-500">
            <BsTwitterX className="text-xl bg-transparent text-blue-400 border rounded-full p-1 w-7 h-7 border-primary" />
          </div>
        </div>
        <div>
          <div className="cursor-pointer hover:!scale-150 duration-500">
            <TiSocialFacebook className="text-3xl text-blue-700 border rounded-full  border-primary bg-transparent" />
          </div>
        </div>
        <div>
          <div className="cursor-pointer hover:!scale-150 duration-500">
            <TiSocialYoutube className="text-3xl text-red-500 border rounded-full p-1 w-8 h-8 border-primary bg-transparent" />
          </div>
        </div>
        <div>
          <div className="cursor-pointer hover:!scale-150 duration-500">
            <TiSocialLinkedin className="text-3xl border rounded-full w-7 h-7 border-primary bg-transparent" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SocialLinks;
