import { useEffect } from "react";
import useData from "../../hooks/useData";
import SectionTitle from "../shared/SectionTitle";
import AwardCard from "./AwardCard";

const AwardSection = () => {
  const { awardData, getAwardData } = useData();

  //   load sward data on first render
  useEffect(() => {
    getAwardData();
  }, []);
  return (
    <div className=" px-2 w-full bg-base-100 mb-10 pb-10 overflow-hidden">
      <div>
        <SectionTitle title="Awards We Achieved" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-10 md:px-5 group mt-2 md:mt-10">
        {awardData.map((award) => (
          <AwardCard key={award._id} award={award} />
        ))}
      </div>
    </div>
  );
};

export default AwardSection;
